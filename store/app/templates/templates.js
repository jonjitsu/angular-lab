angular
    .module('store.templates', ['ngRoute'])
    .config(['$routeProvider', TemplatesRouting])
    .controller('TemplatesCtrl', ['$scope', TemplatesController])
;

function TemplatesRouting($routeProvider) {
    $routeProvider
        .when('/templates', {
            templateUrl: 'templates/templates.html',
            controller: 'TemplatesCtrl'
        });
}

function TemplatesController($scope) {
    console.log($scope);
}
