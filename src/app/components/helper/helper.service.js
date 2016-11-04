(function() {
  'use strict';

  angular
    .module('myAppName')
    // Focus on element by id
    .factory('focus', focus)
    // Local storage setters and getters
    .factory('$localstorage', localstorage)
    // Generates uuid string
    .factory('uuid2', uuid2)
    // Converts \n to <br>
    .factory('nl2br', nl2br)


  /** @ngInject */
  function focus($timeout, $window) {
    return function(id) {
        $timeout(function() {
            var element = $window.document.getElementById(id);
            if (element)
                element.focus();
        });
    };
  }

  function localstorage(localStorageService) {
    return {
        set: function(key, value) {
            localStorageService.set(key, value);
        },
        get: function(key, defaultValue) {
            return localStorageService.get(key) || defaultValue;
        },
        setObject: function(key, value) {
            localStorageService.set(key, value);
        },
        getObject: function(key) {
            return localStorageService.get(key);
        },
        remove: function(key) {
            return localStorageService.remove(key);
        }
    }
  }
  function uuid2() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return {
        newuuid: function() {
            // http://www.ietf.org/rfc/rfc4122.txt
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        newguid: function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
  }
  function nl2br() {
    return function(input) {
        if (input !== void 0) {
            return input.replace(/\n/g, '<br>');
        }
    }
  }
})();
