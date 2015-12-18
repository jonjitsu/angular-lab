
angular
    .module('app.core')
    .directive('minWords', MinWordsDirective);


function MinWordsDirective() {
    return {
        restrict: 'A',
        scope: {
            minWords: '='
        },
        require: 'ngModel',
        link: function($scope, $element, $attrs, $ctrl) {
            var wordCount = function(str) {
                return str.trim().split(/\s+/).length;
            },
                minWords = $scope.minWords;

            console.log(arguments);
            $scope.$parent.minWordz=minWords;
            $ctrl.$validators.minWords = function(modelValue) {
                if( modelValue!==undefined ) {
                    var count = wordCount(modelValue);
                    if(count >= ($scope.minWords || 5)) {
                        return true;
                    }
                }
                return false;
            };

            $element.bind('keyup', function(ev) {
                //console.log($element.value, ev.srcElement.value, this.value);
                $scope.$parent.minWordz = minWords - wordCount(this.value);
                //$scope.$parent.minWordz = wordCount(this.value);
//                $scope.$parent.minWordz = wordCount($element.value);
//                $scope.$parent.minWordz = wordCount(ev.srcElement.value);
            });
        }
    };
}
