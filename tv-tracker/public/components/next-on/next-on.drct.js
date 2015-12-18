
angular
    .module('app.core')
    .directive('nextOn', NextOnDirective);

function NextOnDirective(StoreFactory, ShowService) {
    return {
        templateUrl: 'components/next-on/next-on.tpl.html',
        restrict: 'E',
        scope: {
            limit: '@'
        },
        controller: function($scope) {
            var vm = $scope;

            vm.nextEpisodes = [];

            var getShows = function() {
                var today = new Date();
                today.setHours(0,0,0,0);
                vm.nextEpisodes = [];

                angular.forEach(StoreFactory.getShows(), function(show) {
                    ShowService.get(show.id).then(function(showResponse) {
                        if (showResponse.in_production===true) {
                            var seasonNumber = (showResponse.seasons.length>1)
                                    ? (showResponse.seasons.length-1)
                                    : 1;
                            ShowService.getSeason(show.id, seasonNumber).then(function(response) {
                                angular.forEach(response.episodes, function(episode) {
                                    if (episode.name!=='') {
                                        var date = new Date(episode.air_date);
                                        if (date>=today) {
                                            episode.showName = show.name;
                                            episode.showImage = show.backdrop_path;
                                            episode.homepage = showResponse.homepage;
                                            vm.nextEpisodes.push(episode);
                                        }
                                    }
                                });
                            });
                        }
                    });
                });                
            };

            getShows();
        }
    };
}

