'use strict';

// Declare app level module which depends on views, and components
angular.module('jonsContacts', [
    'ngRoute',
    'firebase',
    'jonsContacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
