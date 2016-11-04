(function() {
  'use strict';

  angular
    .module('myAppName')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        // controller: 'MainController',
        controllerAs: 'main'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        // controller: 'LoginController',
        controllerAs: 'login',
        resolve: {
          anonOnly: anonOnly
        }
      });
    $urlRouterProvider.otherwise('/');
  
  }
  // Allow only anon users 
  function anonOnly() {
      return true;
  }

})();
