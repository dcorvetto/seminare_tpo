/**
 * Created by Juan Cruz on 5/23/2017.
 */
(function () {
    'use strict';

    var app = angular.module('app',['ngRoute','ui.bootstrap']);

    app.config(['$routeProvider', config]);

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/static/html/home.html'
            })
            .when('/curso/listar', {
                templateUrl: '/static/html/Listado Cursos.html',
                controller: ListadoCursosController
            })
            .otherwise('/');
    }

    var ListadoCursosController = function ($scope, $http) {
            $http.get('/escuela/planes/')
            .then(function (response) {
                $scope.planes = (response.data);
            },
            function(){
                alert('Error buscando planes');
            }
            );

            $scope.buscar = function() {
                $http({
                    method: 'GET',
                    url: '/escuela/cursos/',
                    params:{
                        plan: $scope.planId,
                        nombre: $scope.cursoNombre
                    }
                })
                .then(function (response) {
                    $scope.cursos = (response.data);
                    if(response.data.length == 0){
                        alert('No se encontró ningún curso.')
                    }
                },
                function(){
                    alert('Error buscando cursos.');
                }
                );
            }
        };
})();