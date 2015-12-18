'use strict';

// controller
function FooDirCtrl() {

    this.bar = {};
    this.doSomething = function doSomething(arg) {
        this.bar.foobar = arg;
        this.name = arg.prop;
    }.bind(this);

}

// directive
function fooDirective() {
    return {
        restrict: 'E',
        scope: {
            name: '='
        },
        bindToController: true,
        controller: 'FooDirCtrl',
        controllerAs: 'vm',
        template: [
            // vm.name doesn't exist just yet!
            '<div><input ng-model="vm.name"></div>'
        ].join('')
    };
}

angular
    .module('testapp', [])
    .directive('fooDirective', fooDirective)
    .controller('FooDirCtrl', FooDirCtrl);
//    .directive('jwHelloWorld', [function() {
//        return {
//            restrict: 'E',
//            template: '<p>Hello to the world! This is HTML5 Boilerplate...</p>'
//        };
//    }]);
