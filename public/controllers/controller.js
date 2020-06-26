// const app = angular.module("myApp", []);

// app.controller("AppCtrl", function ($scope) {
//   $scope.a = 10;
// });

function AppCtrl($scope, $http) {
  console.log("app");
  var refresh = function () {
    $http.get("/contactlist").success(function (response) {
      console.log(response);
      console.log("called");
      $scope.contactlist = response;
      $scope.contact = "";
    });
  };
  refresh();

  $scope.addContact = function () {
    console.log($scope.contact);
    $http.post("/contactlist", $scope.contact).success(function (res) {
      console.log(res);
      refresh();
    });
  };

  $scope.remove = function (id) {
    console.log(id);
    $http.delete("/contactlist/" + id).success(function (res) {
      refresh();
    });
  };

  $scope.edit = function (id) {
    console.log(id);
    $http.get("/contactlist/" + id).success(function (res) {
      $scope.contact = res;
      // console.log(res + "edit");
    });
  };

  $scope.update = function () {
    console.log();
    $http
      .put("/contactlist/" + $scope.contact._id, $scope.contact)
      .success(function (res) {
        // $scope.contact = res;
        refresh();
      });
  };
}

/*
//controller file
function AppCtrl($scope, $http) {
  // console.log("Hello world from Controller");

  var refresh = function () {
    $http.get("/contactlist").success(function (response) {
      console.log("I got the data I requested");
      $scope.contactlist = response;
      $scope.contact = ""
    });
  };

  refresh();


  $scope.addContact = function () {
    console.log($scope.contact);
    $http.post("/contactlist", $scope.contact).success(function (response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id){
      console.log(id)
      $http.delete('/contactlist/'+id).success(function (response){
        refresh();
      });
  };

  $scope.edit = function(id){
      console.log(id);
      $http.get('/contactlist/'+id).success(function (response){
        $scope.contact = response;
      });
  };

  $scope.update = function(){
      console.log($scope.contact._id);
      $http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function (response){
          refresh();
      })
  }

  $scope.deselect = function(){
      $scope.contact = ""
  }

}*/
