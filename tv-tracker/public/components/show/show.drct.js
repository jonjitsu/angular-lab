
angular
    .module('app.core')
    .directive('showOverview', ShowOverviewDirective);

function ShowOverviewDirective(StoreFactory) {
    return {
        templateUrl: 'components/show/show.tpl.html',
        restrict: 'E',
        scope: {
            show: '=',
            showRating: '='
        },
        controller: function($scope) {
            var vm = $scope;
            vm.trackShow = function(show) {
                StoreFactory.addShow(show);
            };

            vm.unTrackShow = function(id) {        
                StoreFactory.removeShow(id);
            };

            vm.hasShow = function(id) {
                return (StoreFactory.getShow(id) !== false);
            };
        }
    };
}
