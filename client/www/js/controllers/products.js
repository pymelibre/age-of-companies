angular.module('products.controllers', [])

.controller('ProductsController', function($scope, productsService) {
  var result = productsService.list().then(function(response){
    // return response;
    $scope.products = response.data.data;
  }, function(error){
    //something went wrong!
    //Optionally, we can just: return error;
  });


})
