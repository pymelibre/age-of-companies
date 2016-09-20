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

.controller('AlertsController', function($scope, alerttypeService) {
  var result = alerttypeService.getAlertTypes().then(function(response){
    // console.log(response);
    $scope.alerttypes = response.data;
    return response;
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
