angular.module('presence.controllers', [])

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
});
