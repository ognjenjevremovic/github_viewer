//  Closure
(function() {
    'use strict';


    //  Services module
    angular
        .module('githubViewer-services')
        .factory('repoService', repoService);


    //  repoService factory implementation
    repoService.$inject =   ['$http', 'githubURLApi'];
    function repoService($http, githubURLApi) {
        var service = {
            getUserRepos : getUserRepos
        };
        return service;

        function getUserRepos(username) {
            return $http
                .get(githubURLApi + username + '/repos');
        }
    }
}());
