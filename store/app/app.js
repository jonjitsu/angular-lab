'use strict';

// Declare app level module which depends on views, and components
angular.module('store', [
  'ngRoute',
  'store.view1',
  'store.view2',
  'store.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/templates'});
}]);
