/**
 * Created by Juan Cruz on 5/23/2017.
 */
(function () {
    'use strict';

    angular.module('app',['ngRoute'])
        .config(['$routeProvider', config]);

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/static/html/feed.html',
                controller: 'FeedController'
            })
            .when('/post/:slug', {
                templateUrl: '/static/html/post.html',
                controller: 'PostController'
            })
            .otherwise('/');
    }
})();