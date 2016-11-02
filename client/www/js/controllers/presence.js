angular.module('presence.controllers', [])

.controller('CheckinController', function($scope, $state,$cordovaGeolocation, nearPlacesService, Checkin) {
  var place_id = $state.params.place_id;

  var payload = {
    "type": "Checkin",
    "id": null,
    "user": "1",
    "place": place_id
  };

  Checkin.create(payload).then(function(checkin){
    console.log("created checkin");
    console.log(checkin);
    $scope.checkin = checkin;
  });

})

.controller('CheckoutController', function($scope, $state,$cordovaGeolocation, nearPlacesService, Checkout) {
  var place_id = $state.params.place_id;
  // TODO: Replace the place_id with a working variable

  var payload = {
    "type": "Checkout",
    "id": null,
    "user": "1",
    "place": place_id
  };

  Checkout.create(payload).then(function(checkout){
    console.log("created checkout");
    console.log(checkout);
    $scope.checkout = checkout;
  });

})

.controller('NearPlacesController', function($scope, $cordovaGeolocation, nearPlacesService) {

  function get_current_position(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    return $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      var position = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      $scope.position = position;

      return position;

    }, function(err) {
      // error
    });

  }

  function find_near_places(position){

    return nearPlacesService.get(position.latitude, position.longitude).then(function(response){
      var places = response.data;
      $scope.places = places;
      return places;
    }, function(error){
      //something went wrong!
      //Optionally, we can just: return error;
    });

  }

  get_current_position().then(find_near_places);

})
;
