/**
 * Created by Juan Cruz on 5/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

    app.config(['$routeProvider', config]);

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/static/html/home.html'
            })
            .when('/curso/listar', {
                templateUrl: '/static/html/Listado Cursos.html',
                controller: 'ListadoCursosController'
            })
            .when('/curso/alta', {
                templateUrl: '/static/html/Alta Curso.html',
                controller: 'CursosAlta'
            })
            .when('/curso/modificar/:id', {
                templateUrl: '/static/html/Alta Curso.html',
                controller: 'CursosModificar'
            })
            .when('/materia/listar', {
                templateUrl: '/static/html/Listado Materias.html',
                controller: 'ListadoMateriasController'
            })
            .when('/materia/alta', {
                templateUrl: '/static/html/Alta Materia.html',
                controller: 'MateriaAlta'
            })
            .when('/login', {
                templateUrl: '/static/html/login.html',
                controller: 'LoginController'
            })
            .otherwise('/');
    }
})();