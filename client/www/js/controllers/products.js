angular.module('products.controllers', [])

.controller('ProductsController', function($scope, $rootScope, $filter, ionicToast, JsonApiDataStore, Brand, Provision, ProductInstance, Product, Category, ProductStatus, PriceType, PriceData, PresenceData, ShareData) {
  function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  $scope.master = {};

  $scope.update = function(product) {
    $scope.master = angular.copy(product);
    console.log($scope.master);
  };

  $scope.reset = function() {
    $scope.product = angular.copy($scope.master);
  };

  $scope.reset();

  $scope.setCategory = function(category){
    if(category){
      $scope.category = category;
    }else{
      $scope.category = '';
    }
  }

  Provision.findAll({ place: 2 }, { useFilter: true }).then(function (provisions) {
    console.log("Provisions");
    console.log(provisions);
    $scope.provisions = provisions;
    $scope.provision = provisions[0];

    angular.forEach($scope.provision.product_instances, function(pi, index){
      $scope.product[pi.id] = {"product_instance":pi.id};
    });

  }, function(error){
    // $scope.showToast(error.data); //For regular people
    $scope.showToast(error.data); //For the pros
  });

  ProductStatus.findAll().then(function (productStatus) {
    $scope.productStatus = productStatus;
  });

  PriceType.findAll().then(function (priceTypes) {
    $scope.priceTypes = priceTypes;
  });

  Category.findAll().then(function (categories) {
    $scope.categories = categories;
  });


  //funcion para guardar precio
  $scope.savePrice = function(products){

    angular.forEach(products, function(pi, index){
      var filtered = $filter("byCategoryId")($scope.provision.product_instances,$scope);

      // Check if current pi exists in filtered provision.product_instances
      var pi_index = findWithAttr(filtered, "id", pi.product_instance);

      if(pi_index!=-1){
        pi.local = $rootScope.place_id;
        pi.provision = 2;

        PriceData.create(pi).then(function(pricedata){
          // delete(products[index]);
          $scope.showToast("Creado");
        }, function(error){
          $scope.showToast("Error");
        });
      }

    }, products);

  }

  //funcion para guardar presencia

  //funcion para guardar stock

  //Duplicated in alerts.js
  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 5000);
  };

})
