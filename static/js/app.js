/**
 * Created by Juan Cruz on 5/23/2017.
 */
(function () {
    'use strict';

    var app = angular.module('app',['ngRoute']);

    app.config(['$routeProvider', config]);

    function config($routeProvider) {

        $routeProvider
          //  .when('/', {
          //      templateUrl: '/static/html/feed.html',
          //      controller: 'FeedController'
          //  })
            .otherwise('/');
    }

    app.controller("DropdownCtrl", function(){

    });
})();