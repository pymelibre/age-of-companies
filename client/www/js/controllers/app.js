angular.module('starter.controllers', [])

.controller('AppController', function($scope, $rootScope, $location, $ionicHistory, $state, $http, $ionicModal, $timeout, authService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.logout = function(){
    authService.logout();

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    // $state.go($state.current, {}, {reload: true});
    $state.go('app.options');
  }

  validate_place_id = function(){
    var place_id = localStorage.getItem("current_place_id");
    var place = angular.fromJson(localStorage.getItem("current_place"));
    if(place_id){
      $rootScope.place_id = place_id;
    }
    if(place){
      $rootScope.current_place = place;
    }

  }

  validate_place_id();

  $rootScope.$on('$stateChangeStart', validate_place_id);


})
