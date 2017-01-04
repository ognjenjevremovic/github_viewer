//  Closure
(function() {
    'use strict';


    //  Controllers module
    angular
        .module('githubViewer-controllers')
        .controller('MainCtrl', MainCtrl);


    //  MainCtrl controller implementation
    MainCtrl.$inject =  ['userService', 'repoService'];
    function MainCtrl(userService, repoService) {
        var vm =    this;

        vm.person         = undefined;
        vm.personRepos    = undefined;
        vm.error          = undefined;
        vm.githubUsername = undefined;
        vm.getPersonInfo  = getPersonInfo;

        // filters
        vm.filterReposByName =  null;
        vm.limitReposTo      =  '10';
        vm.orderReposBy      =  '+name';

        ////////

        function getPersonInfo(username) {
            //  reset the values
            vm.person      =    undefined;
            vm.personRepos =    undefined;
            vm.error       =    undefined;

            //  retrieve the user information
            userService
                .getUserInfo(username)
                .then(onUserComplete)
                .catch(onError);
        }

        function getPersonRepos(username) {
            repoService
                .getUserRepos(username)
                .then(onReposComplete)
                .catch(onError);
        }

        //  promise callback
        function onUserComplete(response) {
            vm.person = response.data;
            //  get repos for the user
            getPersonRepos(vm.person.login);
        }
        function onReposComplete(response) {
            vm.personRepos =    response.data;
        }
        function onError(reason) {
            if (reason.status === 404) {
                vm.error =  'Could not find the user ' + vm.githubUsername;
            }
            else {
                vm.error =  'Error fetching the data';
            }
        }
    }
}());
