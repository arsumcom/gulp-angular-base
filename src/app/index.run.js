(function() {
  'use strict';

  angular
    .module('myAppName')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
