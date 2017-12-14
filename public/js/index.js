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
  getHalls: function () {
    return new Promise((resolve, reject) => {

      socket.emit('getHalls', null, (answer) => {

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
  $scope.getHalls= function () {
    socketApi.getHalls()
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

    let halll = {
      name: data.name,
      cinema: data.cinema.id,
      quantity: data.quantity
    };


    socketApi.addHall(halll)
      .then((newHalll) => {
        $scope.$apply(function () {
          $scope.data.halls.push(newHalll);
          $scope.newHall = {
            name: "",
            cinema: "",
            quantity: ""
          };
        });
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
  $scope.init= (()=>{
    $scope.getCinemas();
  })();

});
