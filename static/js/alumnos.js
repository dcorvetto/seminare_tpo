 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('AlumnosModificar', ['$scope', '$http', '$routeParams', AlumnosModificar]);
     app.controller('AlumnosAlta', ['$scope', '$http', AlumnosAlta]);
     app.controller('ListadoAlumnosController', ['$scope', '$http', ListadoAlumnosController]);

     function cargarCursos($scope, $http) {
         $http.get('/escuela/cursos/')
             .then(function(response) {
                     $scope.cursos = (response.data);
                 },
                 function() {
                     alert('Error buscando cursos');
                 }
             );
     }

     function AlumnosModificar($scope, $http, $routeParams) {

         // cargarPlanes($scope, $http);
         $http.get('/escuela/Alumnos/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.alumno = (response.data);
                     $scope.alumno.plan = $scope.alumno.plan.toString();
                 },
                 function() {
                     alert('Error buscando alumno');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             $http.put('/escuela/Alumnos/' + $routeParams.id + '/', $scope.alumno)
                 .then(function(response) {
                         alert('alumno modificado con éxito.');
                         window.location = "#/alumno/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }

     }

     function AlumnosAlta($scope, $http) {
         //cargarPlanes($scope, $http);
         $scope.anio = 2017;
         //$scope.alumno = { plan: "", nombre: "", activo: true, anio_lectivo: 2017 };
         $scope.guardar = function() {
             $http.post('/escuela/alumnos/', $scope.alumno)
                 .then(function(response) {
                         alert('alumno cargado con éxito.');
                         window.location = "#/alumno/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }
     };

     function ListadoAlumnosController($scope, $http) {
         cargarCursos($scope, $http);
         $scope.buscar = function() {
             Object.keys($scope.search).map(function(key, index) {
                 if (!$scope.search[key]) {
                     delete $scope.search[key];
                 }
             });
             $http({
                     method: 'GET',
                     url: '/escuela/alumnos/',
                     params: $scope.search
                 })
                 .then(function(response) {
                         $scope.alumnos = (response.data);
                         if (response.data.length == 0) {
                             alert('No se encontró ningún alumno.')
                         }
                     },
                     function() {
                         alert('Error buscando Alumnos.');
                     }
                 );
         };
         $scope.eliminar = function(id) {
             $http({
                     method: 'DELETE',
                     url: '/escuela/alumnos/' + id + '/'
                 })
                 .then(function(response) {
                         alert("alumno eliminado exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                         alert('Error eliminando alumno.');
                     }
                 );
         };
     };
 })();