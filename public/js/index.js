let socket = io();
//create object for work with socket API


let socketApi = {
  addCinema: function (cinema) {
    return new Promise((resolve, reject) => {
      socket.emit('addCinema', cinema, (answer) => {

        if (answer instanceof Error || answer.responseCode == 535)
        // console.log("addition was not succsful: "+ answer.message);
          reject(answer);
        else
          resolve(answer);

      });
    });
  },
  getCinemas: function () {
    return new Promise((resolve, reject) => {
      socket.emit('getCinemas', null, (answer) => {
        if (answer instanceof Error)
          reject(answer);

        else
          resolve(answer);
      });
    });
  },
  addHall: function (hall) {
    return new Promise((resolve, reject) => {
      socket.emit('addHall', hall, (answer) => {

        if (answer instanceof Error || answer.responseCode == 535)
        // console.log("addition was not succsful: "+ answer.message);
          reject(answer);
        else
          resolve(answer);

      });
    });
  },
  getHalls: function (cinema) {
    return new Promise((resolve, reject) => {

      socket.emit('getHalls', cinema, (answer) => {

        if (answer instanceof Error)
          reject(answer);
        else
          resolve(answer);

      });
    });
  },
  addFilm: function (film) {
    return new Promise((resolve, reject) => {
      socket.emit('addFilm', film, (answer) => {

        if (answer instanceof Error || answer.responseCode == 535)
        // console.log("addition was not succsful: "+ answer.message);
          reject(answer);
        else
          resolve(answer);

      });
    });
  },
  getFilms: function () {
    return new Promise((resolve, reject) => {
      socket.emit('getFilms', null, (answer) => {
        if (answer instanceof Error)
          reject(answer);

        else
          resolve(answer);
      });
    });
  },
  addSession: function (Session) {
    return new Promise((resolve, reject) => {
      socket.emit('addSession', Session, (answer) => {

        if (answer instanceof Error || answer.responseCode == 535)
        // console.log("addition was not succsful: "+ answer.message);
          reject(answer);
        else
          resolve();

      });
    });
  },
  getSessions: function (date) {
    return new Promise((resolve, reject) => {

      socket.emit('getSessions', date, (answer) => {

        if (answer instanceof Error)
          reject(answer);
        else
          resolve(answer);

      });
    });
  }

};

//////////////////////////////////////////////////
app = angular.module("Post", []);// initialization  angular app
app.controller("mainCtrl", function ($scope) {

  $scope.data = {
    cinemas: [],
    halls: [],
    films: [],
    sessions: []
  }
////////////////////////////////////////////////////////////////////////////////////////
  $scope.getCinemas = function () {
    socketApi.getCinemas()
      .then(
        (arr) => {
          $scope.data.cinemas = arr;
          $scope.$digest();
        }).catch((err) => {
      alert("Error: " + err.message);
    });
  }

  $scope.addCinema = function (data) {

    let cinema = {
      name: data.name,
      city: data.city
    };


    socketApi.addCinema(cinema)
      .then((newCinema) => {
        document.getElementById("closeCinema").click();
        $scope.$apply(function () {
          $scope.data.cinemas.push(newCinema);
          $scope.newCinema = {
            name: "",
            city: ""
          };
        });
      }).catch((err) => {
      alert(err.message);
    });
  };

  $scope.newCinema = {
    name: "",
    city: ""
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.getHalls= function (cinema) {
    socketApi.getHalls(cinema)
      .then(
        (arr) => {
          $scope.data.halls = arr;
          $scope.$digest();
        },
        (err) => {
          alert("Error: " + err.message);
        });
  }
  $scope.selectedCinema ={};
  $scope.addHall = function (data) {
    document.getElementById("closeHall").click();
    let hall = {
      name: data.name,
      cinema: data.cinema.id,
      quantity: data.quantity
    };


    socketApi.addHall(hall)
      .then(() => {
        $scope.newHall = {
          name: "",
          cinema: "",
          quantity: ""
        };
      }).catch((err) => {
        alert(err.message);
    });
  }
  $scope.newHall = {
    name: "",
    cinema: "",
    quantity: ""
  };
///////////////////////////////////////////////////////////////
  $scope.getFilms = function () {
    socketApi.getFilms()
      .then(
        (arr) => {
          $scope.data.films = arr;
          $scope.$digest();
        }).catch((err) => {
      alert("Error: " + err.message);
    });
  }

  $scope.addFilm = function (data) {

    let film = {
      name: data.name,
      year: data.year,
      length: data.length
    };


    socketApi.addFilm(film)
      .then((newFilm) => {
        document.getElementById("closeFilm").click();
        $scope.$apply(function () {
          $scope.data.films.push(newFilm);
          $scope.newFilm = {
            name: "",
            length: "",
            year: ""
          };
        });
      }).catch((err) => {
      alert(err.message);
    });
  };

  $scope.newFilm = {
    name: "",
    length: "",
    year: ""
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.getSessions= function (date) {
    socketApi.getSessions(date)
      .then(
        (arr) => {

          $scope.data.sessions = arr;
          $scope.$digest();
        },
        (err) => {
          alert("Error: " + err.message);
        });
  }
  $scope.selectedDate ={ value: new Date(2017,11,15)};
  $scope.addSession = function (data) {

    let session = {
      film: data.film.id,
      hall: data.hall.id,
      date: data.date
    };


    socketApi.addSession(session)
      .then(() => {
        document.getElementById("closeSession").click();
        $scope.newSession = {
          film: "",
          hall: "",
          date: ""
        };

      }).catch((err) => {
      alert(err.message);
    });
  }
  $scope.newSession = {
    film: "",
    hall: "",
    date: ""
  };
///////////////////////////////////////////////////////////////
  $scope.init= (()=>{
    $scope.getCinemas();
    $scope.getFilms();
    $scope.getHalls();


  })();

});
