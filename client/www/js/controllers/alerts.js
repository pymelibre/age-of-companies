angular.module('alerts.controllers', [])

.controller('AlertsController', function($scope, $rootScope, ionicToast, AlertType, Alert) {

  $scope.master = {};

  $scope.update = function(alert) {
    $scope.master = angular.copy(alert);
    console.log($scope.master);
  };

  $scope.reset = function() {
    $scope.alert = angular.copy($scope.master);
  };

  $scope.reset();

  //REVISAR PARA ARRIBA

  $scope.createAlert = function(alert){
    var place = angular.fromJson(localStorage.getItem("current_place"));

    var payload = {
      "name": "",
      "description": alert.message,
      "alert_type": alert.type,
      "entity": place.code
    };

    Alert.create(payload).then(function (alert) {
      if(alert){
        $scope.showToast("Alerta creada");
      }
    },function(error){
      // $scope.showToast("Error al crear alerta"); //Message for the people
      $scope.showToast(error.data); //Message for the pros
    });

  };

  AlertType.findAll().then(function (alerttypes) {
    $scope.alerttypes = alerttypes;
  });

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 5000);
  };

})
