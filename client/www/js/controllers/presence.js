angular.module('presence.controllers', [])

.controller('CheckinController', function($scope, $state,$cordovaGeolocation, checkinService, nearPlacesService) {
  var place_id = $state.params.place_id;

  function create_checkin(place_id){

    return checkinService.create(place_id).then(function(response){

      if(response.status == "201"){
        // $state.go("app.options");
      }else{
        alert("No se pudo crear el checkin(cambiar este alert)");
      }

      var checkin = response.data.data;
      $scope.checkin = checkin;
      return checkin;

    }, function(error){
      //something went wrong!
      //Optionally, we can just: return error;
    });

  }

  var checkin = create_checkin();

})


.controller('NearPlacesController', function($scope, $cordovaGeolocation, checkinService, nearPlacesService) {

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
      var places = response.data.data;
      $scope.places = places;
      return places;
    }, function(error){
      //something went wrong!
      //Optionally, we can just: return error;
    });

  }

  get_current_position().then(find_near_places);

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
