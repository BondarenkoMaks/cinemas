const dataModels = require('../.././db').dataModels;
const { cinemaModel, hallModel, seessionModel, filmModel } = dataModels;


module.exports = (socket) => {
  socket.on('error', function (err) {
    console.log(err);
  });
//////////////////////////////////////////////////////////////////Cinemas
  socket.on('getCinemas', (data, callback) => {

    cinemaModel.find({}, function (err, docs) {
      if (err) {
        callback(err);
        throw err;
      }

      callback(docs.map((doc) => {
        let { _id: id, name, city } = doc;
        return { id, name, city };
      }));
    });
  });
  socket.on('addCinema', (cinema, callback) => {

    cinemaModel.create(cinema, function (err, doc) {

      if (err) {
        callback(err);
        throw err;

      }
      let { _id: id, name, city } = doc;
      callback({ id, name, city });
    });

  });

  /////////////////////////////////////////////////////////////////////////////Halls
  socket.on('addHall', (hall, callback) => {
    hallModel
    hallModel.create(hall, function (err, doc) {

      if (err) {
        callback(err);
        throw err;
      }
      let { _id: id, name, quantity, cinema } = doc;
      callback({ id, name, quantity, cinema });
    });

  });

  socket.on('getHalls', (cinema, callback) => {
    debugger;
    let obj = cinema ? {cinema}:{};
    hallModel.find(obj).populate('cinema').exec(function (err, docs) {
      if (err) {
        callback(err);
        throw err;

      }

      callback(docs.map((doc) => {

        let { _id: id, name, quantity, cinema } = doc;
        return { id, name, cinemaId: cinema._id, quantity };
      }));
    });
  });

  /////////////////////////////////////////////////////////////////Films
  socket.on('getFilms', (data, callback) => {

    filmModel.find({}, function (err, docs) {
      if (err) {
        callback(err);
        throw err;

      }

      callback(docs.map((doc) => {
        let { _id: id, name, year, length } = doc;
        return { id, name, year, length };
      }));
    });
  });
  socket.on('addFilm', (film, callback) => {

    filmModel.create(film, function (err, doc) {
      debugger;
      if (err) {
        callback(err);
        throw err;
        // throw new Error('Error operation addEmail');
      }
      let { _id: id, name, year, length } = doc;
      callback({ id, name, year, length });
    });

  });

///////////////////////////////////////////////////////////////////////////////////Session

  socket.on('addSession', (session, callback) => {
    let { date, hall } = session;
    seessionModel.findOne({ date, hall }, function (err, doc) {
      debugger;
      if (!doc) {
        seessionModel.create(session, function (err, docId) {
          debugger;
          if (err) {
            callback(err);
            throw err;
          }
          seessionModel.findById(docId._id).populate('film').populate('hall').populate({
            path: 'hall',
            populate: { path: 'cinema' }
          }).exec(function (err, doc) {
            debugger;
            let { _id: id, date, hall, film } = doc;
            callback({ id, date, hall: hall.name, cinema: hall.cinema.name, film: film.name });
          });

        });
      }else{
        callback(new Error('session exist yet'));
      }
      });

  });
  socket.on('getSessions', (date, callback) => {

    debugger;
    seessionModel.find({date}).populate('film').populate('hall').populate({
      path: 'hall',
      populate: { path: 'cinema' }
    }).exec(function (err, docs) {
      if (err) {
        callback(err);
        throw err;
      }

      callback(docs.map((doc) => {
        debugger;
        let { _id: id, date, hall, film } = doc;
        return { id, date, hall: hall.name, cinema: hall.cinema.name, film: film.name };
      }));
    });
  });

}




