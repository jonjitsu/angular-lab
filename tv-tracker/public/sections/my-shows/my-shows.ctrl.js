
angular
    .module('app.core')
    .controller('MyShowsController', MyShowsController);

function MyShowsController(StoreFactory) {
    var vm = this;

    vm.results = StoreFactory.getShows();
}


