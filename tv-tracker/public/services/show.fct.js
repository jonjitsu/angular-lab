
angular
    .module('app.services')
    .factory('ShowService', dataService);


function dataService($http, API_KEY, BASE_URL, $log) {
    var asdf=1,
        extract = function(propOrProps){
            if (angular.isArray(propOrProps)) {
                return function(data) {
                    var newData = {};
                    // angular.forEach(propOrProps, function(prop) {
                    //     newData[prop] = data[prop];
                    // });
                    for (var i=0; i<propOrProps.length; i++) {
                        newData[propOrProps[i]] = data[propOrProps[i]];
                    }
                    return newData;
                };
            }
            return function(data) {
                return data[propOrProps];
            };
        },
        makeQuery = function(params) {
            var hop = {}.hasOwnProperty,
                prop, queries = [];
            for (prop in params) {
                if (hop.call(params, prop)) {
                    queries.push(prop + '=' + params[prop]);
                }
            }
            return queries.join('&');
        },

        makeRequest = function(path, params) {
            var params = params || {},
                requestUrl = BASE_URL + '/' + path + '?api_key=' + API_KEY,

                dataServiceError = function(error) {
                    $log.error('XHR Failed for ShowService');
                    $log.error(error);
                    return error;
                };

            return $http({
                url: requestUrl + '&' + makeQuery(params),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: true
            })
                .then(extract('data'))
                .catch(dataServiceError);
        },

        api = {
            get: function get(id) {
                return makeRequest('tv/' + id);
            },
            search: function(query, page) {
                return makeRequest("search/tv", {query: query, page:page})
                    .then(function(data) { return data; });
            },
            getSeason: function(showId, seasonNumber) {
                return makeRequest('tv/' + showId + '/season/' + seasonNumber);
            }
        };

    return api;
}
