
angular
    .module('app.core')
    .controller('SearchController', SearchController);

function SearchController(ShowService, $timeout) {
    var vm = this,
        flatten = function() {
            var props = [].slice.call(arguments);

            return function(data) {
                if( props.length===1 ) {
                    return data[props[0]];
                } else {
                    throw "@TODO";
                }
            };
        };

    vm.results = false;
    vm.searching = false;
    vm.currentPage = 1;
    vm.totalResults = 0;
    vm.query = function(query) {
        vm.searching = true;
        ShowService
            .search(query, vm.currentPage)
            .then(function(response) {
                vm.results = response.results;
                vm.totalResults = response.total_results;
                $timeout(function() {
                    vm.searching = false;
                }, 500);
            }).catch(function(error) {
                
            });
    };

    vm.typeahead = function(query) {
        return ShowService
            .search(query, vm.currentPage)
            .then(function(response) {
                return response.results.map(flatten('name'));
            });
    };
}
