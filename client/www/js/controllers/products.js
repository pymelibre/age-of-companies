angular.module('products.controllers', [])

.controller('ProductsController', function($scope, JsonApiDataStore, Brand, Provision, ProductInstance, Product, Category, ProductStatus) {
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
      $scope.product[pi.id] = {"id":pi.id};
    });

  }, function(error){
    console.log(error);
  });

  ProductStatus.findAll().then(function (productStatus) {
    $scope.productStatus = productStatus;
  });

  Category.findAll().then(function (categories) {
    $scope.categories = categories;
  });

})
