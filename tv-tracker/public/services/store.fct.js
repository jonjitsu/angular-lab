
angular
    .module('app.services')
    .factory('StoreFactory', dataService);

function dataService(localStorageService, $rootScope) {
    var LS_KEY = 'shows',
        _shows = [],

        init = function() {
            var ls = localStorageService.get(LS_KEY);
            if( ls!==null ) _shows = ls;

            $rootScope.$watch(function() {
                return _shows;
            }, function() {
                save();
            }, true); // true for deep watch
        },

        save = function() {
            localStorageService.set(LS_KEY, _shows);
        },

        deleteShow = function(index) {
            _shows.splice(index, 1);
            save();
        },

        api = {
            addShow: function(data) {
                _shows.push(data);
                save();
            },
            getShow: function(id) {
                id = parseInt(id, 10);
                for (var i=0; i<_shows.length; i++) {
                    if( _shows[i].id===id) return _shows[i];
                }
                return false;
            },
            getShows: function() {
                return _shows;
            },
            // Integer -> Boolean
            // Given a show id searchs data store and removes it.
            removeShow: function(id) {
                for(var i=0; i<_shows.length; i++) {
                    if( _shows[i].id===id) deleteShow(i);
                }
            }
        }
    ;

    init();
    return api;
}
