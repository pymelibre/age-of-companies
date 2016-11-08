angular.module('products.controllers', [])

.controller('ProductsController', function($scope, $rootScope, JsonApiDataStore, Brand, Provision, ProductInstance, Product, Category, ProductStatus, PriceData, PresenceData, ShareData) {
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
    console.log(error);
  });

  ProductStatus.findAll().then(function (productStatus) {
    $scope.productStatus = productStatus;
  });

  Category.findAll().then(function (categories) {
    $scope.categories = categories;
  });


  //funcion para guardar precio
  $scope.savePrice = function(products){
    // alert("save price");
    console.log("save price");
    console.log(products);
    console.log(this);

    angular.forEach(products, function(pi, index){
      console.log("pi");

      pi.local = $rootScope.place_id;
      pi.provision = 2;

      console.log(pi);


      PriceData.create(pi).then(function(pricedata){
        delete(products[index]);
      }, function(error){
        alert("Error");
        console.log(error);
      });

      // if(product.category.id == scope.category){
      //   this.push(product);
      // }
    }, products);
    // }, out);

    // console.log("products");
    // console.log(products);
  }

  //funcion para guardar presencia

  //funcion para guardar stock


})
