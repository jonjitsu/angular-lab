/*eslint-disable no-alert, no-console, no-undef, no-unused-vars */
'use strict';


var emacs=':(',
    what = function(msg) {
        return function() {
            console.log(msg, arguments[0]);
        };
    },
    l = console.log.bind(console),
    urls = [
        'http://lorempixel.com/g/400/200',
        'http://25.media.tumblr.com/tumblr_m31bisr9Tl1qejbiro1_1280.jpg'
    ],
    ImageLoader = (function(undefined) {
        var VERSION='0.2.0',
            loadImage = function(url) {
                return new Promise(function(onFulfilled, onRejected) {
                    var img = new Image(),
                        resolver = function(onComplete) {
                            return function() {
                            img = void 0;
                                onComplete.apply(this, arguments);
                            };
                        };
                    img.onerror = resolver(onRejected);
                    img.onload  = resolver(onFulfilled);
                    img.src     = url;
                    //setTimeout(function() { img.src = url; }, 2000);
                });
            },
            loadImages = function(urls, options) {
                // simple, no options
                var urlsToPromises = function(urls) {
                   return urls.map(function(url) {
                       return loadImage(url);
                   });
                };
                return Promise.all(urlsToPromises(urls));
                // not sure if we can do better queuing than the browser.
                // add to queue
                // start loader if not already started
                var queue = urls.slice(),
                    p = new Promise(function(onFulfilled, onRejected) {
                        
                    })
                ;

                return p;
            },
            api = {
                version: VERSION,
                loadImage: loadImage,
                loadImages: loadImages
            }
        ;
        return api;
    })();

angular
    .module('testapp', [])
    .factory('imgLoader', function() {
        return ImageLoader;
    })
    .directive('preload', ['imgLoader', function(imgLoader) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var fallbackImageUrl = attrs.fallbackImageUrl,
                    url = attrs.ngSrc
                ;
                l(url);
                element.hide();
                imgLoader
                    .loadImage(url)
                    .then(function() {
                        attrs.$set('src', url);
                        element.show();                        
                    }, function() {
                        if (fallbackImageUrl!==undefined) { 
                            attrs.$set('src', fallbackImageUrl);
                            element.show();
                        }
                    });
            }
        };
    }])
