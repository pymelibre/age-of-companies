angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    var link = '/login';

    var payload = {
      "usr" : $scope.loginData.username,
      "psw" : $scope.loginData.password,
      "version":"1",
      "gcm":""
    }

    $http.post(link, payload).then(function (res){
      var token = res.data.tkn;
      window.localStorage.setItem('token', token);
      $scope.response = res.data;
      $scope.closeLogin();
    });

  };
})

.controller('PlaylistsCtrl', function($scope, alerttypeService) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 }
  ];
})

.controller('CheckinController', function($scope, $cordovaGeolocation, checkinService) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    var lat  = position.coords.latitude
    var long = position.coords.longitude
    // alert(lat + " --- " + long);
    $scope.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }, function(err) {
    // error
  });

  var result = checkinService.create().then(function(response){
    // return response;
    console.log(response);
    $scope.datetime = response.data.data.attributes.created_at;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });
})

.controller('CheckoutController', function($scope, $cordovaGeolocation, checkoutService) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    var lat  = position.coords.latitude
    var long = position.coords.longitude
    // alert(lat + " --- " + long);
    $scope.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }, function(err) {
    // error
  });

  var result = checkoutService.create().then(function(response){
    // return response;
    console.log(response);
    $scope.datetime = response.data.data.attributes.created_at;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });
})

.controller('historyController', function($scope, historyService) {
  // console.log("wea");
  var result = historyService.list().then(function(response){
    // return response;
    console.log(response);
    $scope.checkins = response.data.data;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });
})

.controller('AlertsController', function($scope, alerttypeService, organizationalunittypesService) {
  var result = alerttypeService.getAlertTypes().then(function(response){
    // return response;
    $scope.alerttypes = response.data.data;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });
  var result = organizationalunittypesService.getOrganizationalUnitTypes().then(function(response){
    // return response;
    $scope.organizationalunittypes = response.data.data;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GeoLocationCtrl', function($scope) {
  function wea(position) {
    $scope.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }

  navigator.geolocation.getCurrentPosition(wea, wea);

});
