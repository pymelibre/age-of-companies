angular.module('alerts.controllers', [])

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
