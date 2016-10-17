angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $http, $ionicModal, $timeout, authService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.logout = function(){
    authService.logout();
    // $state.go($state.current, {}, {reload: true});
    $state.go('app.options', {}, {reload: true});
  }

})
