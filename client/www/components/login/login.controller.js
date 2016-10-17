// www/components/login/login.controller.js

(function () {
  'use strict';

  angular
    .module('starter')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authService'];

  function LoginController($state, authService) {
    var vm = this;

    function doLogin() {
      authService.login();
    }

    doLogin();
  }

})();
