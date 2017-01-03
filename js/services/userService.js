//  Closure
(function() {
    'use strict';


    //  Services module
    angular
        .module('githubViewer-services')
        .factory('userService', userService);


    //  userService factory implementation
    userService.$inject =   ['$http', 'githubURLApi'];
    function userService($http, githubURLApi) {
        var service = {
            getUserInfo : getUserInfo
        };
        return service;

        ////////

        function getUserInfo(username) {
            return $http
                    .get(githubURLApi + username);
        }
    }
}());
