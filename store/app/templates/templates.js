angular
    .module('store.templates', ['ngRoute'])
    .config(['$routeProvider', TemplatesRouting])
    .constant('TEMPLATES_API_URL', '/app/data/templates.json')
    .factory('TemplatesFactory', ['$http', 'TEMPLATES_API_URL', TemplatesFactory])
    .controller('TemplatesCtrl', ['$scope', 'TemplatesFactory', TemplatesCtrl])
    .controller('TemplateDetailsCtrl', ['$scope', '$routeParams', 'TemplatesFactory', TemplateDetailsCtrl])
;

function TemplatesRouting($routeProvider) {
    $routeProvider
        .when('/templates', {
            templateUrl: 'templates/templates.html',
            controller: 'TemplatesCtrl'
        })
        .when('/templates/:templateId', {
            templateUrl: 'templates/template-details.html',
            controller: 'TemplateDetailsCtrl'
        })
}

function update(scope, prop) {
    return function(data) {
        console.log(data);
        scope[prop]=data;
    };
}

function TemplatesCtrl($scope, TemplatesFactory) {
    var vm = $scope;

    vm.templates = [];
    TemplatesFactory
        .all()
        .then(update(vm, 'templates'));
}

function TemplateDetailsCtrl($scope, $routeParams, TemplatesFactory) {
    var vm = $scope; 

    vm.template = {};
    TemplatesFactory
        .get(parseInt($routeParams.templateId, 10))
        .then(update(vm, 'template'));
}

function TemplatesFactory($http, API_URL) {
    return {
        all: function() {
            return $http
                .get(API_URL)
                .then(function(response) {
                    return response.data;
                });
        },
        get: function(id) {
            return this.all()
                .then(function(templates) {
                    return Lazy(templates)
                        .filter(function(template) {
                            return template.id === id;
                        })
                        .first();
                })
        }
    };
}
