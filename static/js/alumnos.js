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
                 function(response) {
                     var errors = "";
                     Object.keys(response.data).map(function(e) {
                             return e + ": " + response.data[e] + '\n';
                         })
                         .forEach(function(e) {
                             errors = errors + e;
                         });
                     alert(errors);
                 }
             );
     }

     function AlumnosModificar($scope, $http, $routeParams) {

         // cargarPlanes($scope, $http);
         $http.get('/escuela/alumnos/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.alumno = (response.data);
                 },
                 function() {
                     alert('Error buscando alumno');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             if (!$scope.alumno.numero_doc) {
                 alert("El número de documento es un campo requerido.")
                 return;
             }
             $http.put('/escuela/alumnos/' + $routeParams.id + '/', $scope.alumno)
                 .then(function(response) {
                         alert('alumno modificado con éxito.');
                         window.location = "#/alumno/listar"
                     },
                     function(response) {
                         var errors = "";
                         Object.keys(response.data).map(function(e) {
                                 return e + ": " + response.data[e] + '\n';
                             })
                             .forEach(function(e) {
                                 errors = errors + e;
                             });
                         alert(errors);
                     }
                 );
         }

     }

     function AlumnosAlta($scope, $http) {
         //cargarPlanes($scope, $http);
         $scope.anio = 2017;
         $scope.alumno = { activo: true };
         $scope.guardar = function() {
             if (!$scope.alumno.numero_doc) {
                 alert("El número de documento es un campo requerido.")
                 return;
             }
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
         $scope.search = {};
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