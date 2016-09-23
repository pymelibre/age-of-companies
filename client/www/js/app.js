// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.alerts', {
    url: '/alerts',
    views: {
      'menuContent': {
        templateUrl: 'templates/alerts.html',
        controller: 'AlertsController'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.options', {
      url: '/options',
      views: {
        'menuContent': {
          templateUrl: 'templates/options.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.ipos', {
    url: '/ipos',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/index.html'
      }
    }
  })

  .state('app.ipos_prices', {
    url: '/ipos/prices',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/prices.html'
      }
    }
  })

  .state('app.ipos_presence', {
    url: '/ipos/presence',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/presence.html'
      }
    }
  })

  .state('app.ipos_share', {
    url: '/ipos/share',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/share.html'
      }
    }
  })


  .state('app.inout', {
    url: '/inout',
    views: {
      'menuContent': {
        templateUrl: 'templates/inout/index.html'
      }
    }
  })

  .state('app.inout_success', {
    url: '/inout/success',
    views: {
      'menuContent': {
        templateUrl: 'templates/inout/success.html',
        controller: 'GeoLocationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/options');
})

// Data Factories
.factory('alerttypeService', function($http) {
  var users = [];

	return {
		getAlertTypes: function(){
			return $http.get("/api/alerttypes/").then(function(response){
				return response;
			});
		},
		getAlertType: function(index){
      return $http.get("/api/alerttypes/"+index).then(function(response){
				return response;
			});
		}
	}

})
.factory('organizationalunittypesService', function($http) {
  var users = [];

	return {
		getOrganizationalUnitTypes: function(){
			return $http.get("/api/organizationalunittypes/").then(function(response){
				return response;
			});
		},
		getOrganizationalUnitType: function(index){
      return $http.get("/api/organizationalunittypes/"+index).then(function(response){
				return response;
			});
		}
	}

});
