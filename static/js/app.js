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
            .when('/materia/modificar/:id', {
                templateUrl: '/static/html/Alta Materia.html',
                controller: 'MateriaModificar'
            })
            .when('/alumno/listar', {
                templateUrl: '/static/html/Listado Alumnos.html',
                controller: 'ListadoAlumnosController'
            })
            .when('/alumno/alta', {
                templateUrl: '/static/html/Alta Alumno.html',
                controller: 'AlumnosAlta'
            })
            .when('/alumno/modificar/:id', {
                templateUrl: '/static/html/Alta Alumno.html',
                controller: 'AlumnosModificar'
            })
            .when('/plan/listar', {
                templateUrl: '/static/html/Listado Planes.html',
                controller: 'ListadoPlanesController'
            })
            .when('/plan/alta', {
                templateUrl: '/static/html/Alta Plan.html',
                controller: 'PlanesAlta'
            })
            .when('/plan/modificar/:id', {
                templateUrl: '/static/html/Alta Plan.html',
                controller: 'PlanesModificar'
            })
            .when('/login', {
                templateUrl: '/static/html/login.html',
                controller: 'LoginController'
            })
            .otherwise('/');
    }
})();