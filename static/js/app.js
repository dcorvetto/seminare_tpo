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
                controller: ListadoCursosController
            })
            .when('/curso/alta', {
                templateUrl: '/static/html/Alta Curso.html',
                controller: CursosAlta
            })
            .when('/curso/modificar/:id', {
                templateUrl: '/static/html/Alta Curso.html',
                controller: CursosModificar
            })
            .when('/materia/listar', {
                templateUrl: '/static/html/Listado Materias.html',
                controller: ListadoMateriasController
            })
            .when('/materia/alta', {
                templateUrl: '/static/html/Alta Materia.html',
                controller: MateriaAlta
            })
            .otherwise('/');
    }

    var MateriaAlta = function($scope, $http) {
        cargarPlanes($scope, $http);
        // $scope.anio = 2017;
        // $scope.curso = { plan: "", nombre: "", activo: true, anio_lectivo: 2017 };
        $scope.guardar = function() {
            $http.post('/escuela/materias/?format=json', $scope.materia)
                .then(function(response) {
                        alert('Materia cargado con éxito.');
                        window.location = "#/materia/listar"
                    },
                    function(response) {
                        alert(response.status);
                    }
                );
        }
    };
    var ListadoMateriasController = function($scope, $http) {
        cargarPlanes($scope, $http);
        $scope.buscar = function() {
            $http({
                    method: 'GET',
                    url: '/escuela/materias/',
                    params: {
                        planId: $scope.planId,
                        cursoNombre: $scope.cursoNombre
                    }
                })
                .then(function(response) {
                        $scope.materias = (response.data);
                        if (response.data.length == 0) {
                            alert('No se encontró ninguna materia.')
                        }
                    },
                    function() {
                        alert('Error buscando materias.');
                    }
                );
        };
        $scope.eliminar = function(id) {
            $http({
                    method: 'DELETE',
                    url: '/escuela/materias/' + id + '/'
                })
                .then(function(response) {
                        alert("Materia eliminado exitosamente.")
                        $scope.buscar()
                    },
                    function() {
                        alert('Error eliminando materia.');
                    }
                );
        };
    }

    function cargarPlanes($scope, $http) {
        $http.get('/escuela/planes/')
            .then(function(response) {
                    $scope.planes = (response.data);
                },
                function() {
                    alert('Error buscando planes');
                }
            );
    }
    var CursosModificar = function($scope, $http, $routeParams) {
        cargarPlanes($scope, $http);
        $http.get('/escuela/cursos/' + $routeParams.id + '/')
            .then(function(response) {
                    $scope.curso = (response.data);
                    $scope.curso.plan = $scope.curso.plan.toString();
                },
                function() {
                    alert('Error buscando curso');
                    window.location = "#/"
                }
            );
        $scope.guardar = function() {
            $http.put('/escuela/cursos/' + $routeParams.id + '/', $scope.curso)
                .then(function(response) {
                        alert('Curso modificado con éxito.');
                        window.location = "#/curso/listar"
                    },
                    function(response) {
                        alert(response.status);
                    }
                );
        }

    }
    var CursosAlta = function($scope, $http) {
        cargarPlanes($scope, $http);
        $scope.anio = 2017;
        $scope.curso = { plan: "", nombre: "", activo: true, anio_lectivo: 2017 };
        $scope.guardar = function() {
            $http.post('/escuela/cursos/?format=json', $scope.curso)
                .then(function(response) {
                        alert('Curso cargado con éxito.');
                        window.location = "#/curso/listar"
                    },
                    function(response) {
                        alert(response.status);
                    }
                );
        }
    };

    var ListadoCursosController = function($scope, $http) {
        cargarPlanes($scope, $http);
        $scope.buscar = function() {
            $http({
                    method: 'GET',
                    url: '/escuela/cursos/',
                    params: {
                        planId: $scope.planId,
                        cursoNombre: $scope.cursoNombre
                    }
                })
                .then(function(response) {
                        $scope.cursos = (response.data);
                        if (response.data.length == 0) {
                            alert('No se encontró ningún curso.')
                        }
                    },
                    function() {
                        alert('Error buscando cursos.');
                    }
                );
        };
        $scope.eliminar = function(id) {
            $http({
                    method: 'DELETE',
                    url: '/escuela/cursos/' + id + '/'
                })
                .then(function(response) {
                        alert("Curso eliminado exitosamente.")
                        $scope.buscar()
                    },
                    function() {
                        alert('Error eliminando curso.');
                    }
                );
        };
    };
})();