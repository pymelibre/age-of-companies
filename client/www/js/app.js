// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-toast', 'ngCordova', 'angularMoment', 'starter.controllers', 'alerts.controllers', 'presence.controllers', 'products.controllers', 'auth0.lock', 'angular-jwt','beauby.jsonApiDataStore', 'js-data'])
.run(run)
.config(config)

//Category Filter
.filter('byCategoryId', function() {
  return function(products, scope) {
    products = products || [];
    var out = [];

    if(scope.category){
      angular.forEach(products, function(product, index) {
        if(product.category.id == scope.category){
          this.push(product);
        }
      }, out);
    }

    return out;
  };
})


// Data Factories
.factory('nearPlacesService', function($http) {
  // console.log($http.defaults.headers);
  $http.defaults.headers.common['Accept'] = "application/json, text/plain, */*, application/vnd.api+json";
  $http.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8";
  return {
    get: function(latitude, longitude){
      var payload = {
        "type": "NearPlacesViewSet",
        "id": null,
        "latitude": latitude,
        "longitude": longitude
      };
      return $http.post("/api/near/", payload).then(function(response){
        return response;
      });
    }
  }
})


.factory('AlertType', function(DS) {
  return DS.defineResource({
    name:'alerttype',
    endpoint:'/api/alerttypes/'
  });
})

.factory('Alert', function(DS) {
  return DS.defineResource({
    name:'alert',
    endpoint:'/api/alerts/'
  });
})

.factory('Brand', function(DS) {
  return DS.defineResource({
    name:'brand',
    endpoint:'/api/brands/'
  });
})

.factory('Category', function(DS) {
  return DS.defineResource({
    name:'category',
    endpoint:'/api/categories/'
  });
})

.factory('Product', function(DS) {
  return DS.defineResource({
    name:'product',
    endpoint:'/api/products/',
    belongsTo: {
      brand: {
        // localField is for linking relations
        // user.profile -> profile of the user
        localField: 'brand',
        // foreignKey is the "join" field
        // the name of the field on a profile that points to its parent user
        foreignKey: 'brandId'
      },
      category: {
        // localField is for linking relations
        // user.profile -> profile of the user
        localField: 'category',
        // foreignKey is the "join" field
        // the name of the field on a profile that points to its parent user
        foreignKey: 'categoryId'
      }
    }
  });
})

.factory('Client', function(DS) {
  return DS.defineResource({
    name:'client',
    endpoint:'/api/clients/'
  });
})

.factory('ProductInstance', function(DS) {
  return DS.defineResource({
    name:'productinstance',
    endpoint:'/api/productsinstances/'
  });
})

.factory('Local', function(DS) {
  return DS.defineResource({
    name:'local',
    endpoint:'/api/locals/'
  });
})

.factory('Provision', function(DS) {
  return DS.defineResource({
    name:'provision',
    endpoint:'/api/provisions/'
  });
})

.factory('ProductStatus', function(DS) {
  return DS.defineResource({
    name:'productstatus',
    endpoint:'/api/productstatus/'
  });
})

.factory('PriceType', function(DS) {
  return DS.defineResource({
    name:'pricetype',
    endpoint:'/api/pricetypes/'
  });
})

.factory('ProductData', function(DS) {
  return DS.defineResource({
    name:'productdata',
    endpoint:'/api/productsdatas/'
  });
})

.factory('PriceData', function(DS) {
  return DS.defineResource({
    name:'pricedata',
    endpoint:'/api/pricedatas/'
  });
})

.factory('PresenceData', function(DS) {
  return DS.defineResource({
    name:'presencedata',
    endpoint:'/api/presencedatas/'
  });
})

.factory('ShareData', function(DS) {
  return DS.defineResource({
    name:'sharedata',
    endpoint:'/api/sharedatas/'
  });
})

.factory('Checkin', function(DS) {
  return DS.defineResource({
    name:'checkin',
    endpoint:'/api/checkins/'
  });
})

.factory('Checkout', function(DS) {
  return DS.defineResource({
    name:'checkout',
    endpoint:'/api/checkouts/'
  });
})

;

config.$inject = ['$stateProvider', '$urlRouterProvider', 'lockProvider', 'jwtOptionsProvider'];

function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
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

  .state('app.options', {
    url: '/options',
    views: {
      'menuContent': {
        templateUrl: 'templates/options.html'
      }
    }
  })

  .state('app.ipos_prices', {
    url: '/ipos/prices',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/prices.html',
        controller: 'ProductsController'
      }
    }
  })

  .state('app.ipos_presence', {
    url: '/ipos/presence',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/presence.html',
        controller: 'ProductsController'
      }
    }
  })

  .state('app.ipos_share', {
    url: '/ipos/share',
    views: {
      'menuContent': {
        templateUrl: 'templates/ipos/share.html',
        controller: 'ProductsController'
      }
    }
  })

  .state('app.inout_near', {
    url: '/inout/near',
    views: {
      'menuContent': {
        templateUrl: 'templates/inout/near.html',
        controller: 'NearPlacesController'
      }
    }
  })

  .state('app.inout_checkin', {
    url: '/inout/checkin/:place_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/inout/checkin.html',
        controller: 'CheckinController'
      }
    }
  })

  .state('app.inout_checkout', {
    url: '/inout/checkout/:place_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/inout/checkout.html',
        controller: 'CheckoutController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/options');

  lockProvider.init({
    clientID: window.auth0_clientID,
    domain: window.auth0_domain,
    options: {
      auth: {
        redirect: false,
        params: {
          scope: window.auth0_scope,
          device: 'Mobile device'
        }
      },
      languageDictionary: {
        title: "Client APP"
      },
      theme: {
        // labeledSubmitButton: false,
        // logo: "https://example.com/assets/logo.png",
        primaryColor: "black"
      }
    }
  });

  // Configuration for angular-jwt
  jwtOptionsProvider.config({
    tokenGetter: function() {
      return localStorage.getItem('id_token');
    },
    whiteListedDomains: ['localhost'],
    unauthenticatedRedirectPath: '/login'
  });

}

run.$inject = ['$ionicPlatform', '$http','$rootScope', 'authService'];

function run($ionicPlatform, $http,$rootScope, authService) {
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

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    //This event gets triggered on URL change
    $rootScope.$on('$locationChangeStart', authService.checkAuthOnRefresh);

    // Authorization based on the token given by Auth0
    var id_token = localStorage.getItem('id_token');

    $rootScope.$on('$locationChangeStart', function(){
      if(id_token != null){
        $http.defaults.headers.common.Authorization = 'JWT '+id_token;
      }
    });

  });

  // Check is the user authenticated before Ionic platform is ready
  authService.checkAuthOnRefresh();
}
