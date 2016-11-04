(function() {
  'use strict';

  angular
    .module('myAppName')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider, $mixpanelProvider, config, localStorageServiceProvider, $windowProvider) {
    // Enable log
    $logProvider.debugEnabled(config.debug);
    
    var $window = $windowProvider.$get();

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $locationProvider.html5Mode(true);
    $mixpanelProvider.apiKey(config.mixpanelKey); 
    localStorageServiceProvider.setPrefix('myAppName').setStorageCookieDomain($window.location.origin);
  }

})();
