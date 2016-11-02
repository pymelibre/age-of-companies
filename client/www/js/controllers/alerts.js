angular.module('alerts.controllers', [])

.controller('AlertsController', function($scope, ionicToast, AlertType, Alert) {

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

    // Alert.findAll().then(function (alerts) {
    //   console.log(alerts);
    // });
    var payload = {
      "name":"",
      "description":alert.message,
      "alert_type":alert.type,
      "entity":"1"
    };

    Alert.create(payload).then(function (alert) {
      if(alert){
        $scope.showToast("Alerta creada");
      }
    });

  };

  AlertType.findAll().then(function (alerttypes) {
    $scope.alerttypes = alerttypes;
  });

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 5000);
  };

})
