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

.controller('CheckoutController', function($scope, $cordovaGeolocation, placesService, checkoutService) {
  var place_id = null;

  var posOptions = {timeout: 10000, enableHighAccuracy: false};

  getCurrentPosition = $cordovaGeolocation.getCurrentPosition(posOptions)
  .then(function (position) {
    return position;
  }, function(error) {
    return error;
  });

  function setPositionAtScope(position){
    $scope.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    return position;
  }

  function createPlace(position){
    var place = placesService.create(position.coords.latitude, position.coords.longitude).then(function(response){
      // console.log(response);
      // console.log(response.data.data.id);

      place_id = response.data.data.id;
      $scope.address = response.data.data.attributes.address;
      return response;
      // return "wea";
    }, function(error){
      // return error;
    });
  }

  function createCheckout(position){
    console.log(position);
    var result = checkoutService.create(place_id).then(function(response){
      return response;
      // return response;
      // console.log(response);
      // $scope.datetime = response.data.data.attributes.created_at;
    }, function(error){
      return error;
      //something went wrong!
      //Optionally, we can just: return error;
    });
  }

  var position = getCurrentPosition.then(setPositionAtScope);
  // position.then(console.log);
  var place_id = position.then(createPlace);

  console.log(place_id);
  place_id.then(console.log);

  // getCurrentPosition.then(createCheckout);


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
