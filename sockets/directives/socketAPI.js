const dataModels = require('db').dataModels;
const { cinemaModel, hallModel, seessionModel, filmModel } = dataModels;


module.exports = (socket) => {


  socket.on('getCinemas', (data, callback) => {


    cinemaModel.find({}, function (err, docs) {
      if (err) {
        callback(err);
        //throw new Error('Error operation delete');
      }

      callback(docs.map((doc) => {
        let { _id: id, name, city } = doc;
        return { id, name, city };
      }));
    });
  });
  socket.on('addCinema', (cinema, callback) => {

    debugger;


    cinemaModel.create(cinema, function (err, doc) {
      debugger;
      if (err) {
        callback(err);
        // throw new Error('Error operation addEmail');
      }
      let { _id: id, name, city } = doc;
      callback({ id, name, city });
    });

  });
  socket.on('addHall', (hall, callback) => {


    console.dir('new hall : ' + hall);
    debugger;


    hallModel.create(hall, function (err, doc) {
      debugger;
      if (err) {
        callback(err);
        //throw new Error('Error operation addEmail');
      }
      let { _id: id, name, quantity, cinema } = doc;
      callback({ id, name, quantity, cinema });
    });

  });

  socket.on('getHalls', (cinemaId, callback) => {


    hallModel.find({}).populate("cinema").exec( function (err, docs) {
      if (err) {
        callback(err);
        //throw new Error('Error operation delete');
      }
      debugger;
      callback(docs.map((doc) => {
        debugger;
        let { _id: id, name, quantity, cinema} = doc;
        return { id, name, cinemaId: cinema._id , quantity};
      }));
    });
  });

}

