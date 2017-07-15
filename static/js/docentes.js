 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('DocentesModificar', ['$scope', '$http', '$routeParams', docentesModificar]);
     app.controller('DocentesAlta', ['$scope', '$http', docentesAlta]);
     app.controller('ListadoDocentesController', ['$scope', '$http', ListadodocentesController]);

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

     function docentesModificar($scope, $http, $routeParams) {

         // cargarPlanes($scope, $http);
         $http.get('/escuela/docentes/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.docente = (response.data);
                 },
                 function() {
                     alert('Error buscando docente');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             if (!$scope.docente.numero_doc) {
                 alert("El número de documento es un campo requerido.")
                 return;
             }
             $http.put('/escuela/docentes/' + $routeParams.id + '/', $scope.docente)
                 .then(function(response) {
                         alert('docente modificado con éxito.');
                         window.location = "#/docente/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }

     }

     function docentesAlta($scope, $http) {
         //cargarPlanes($scope, $http);
         $scope.anio = 2017;
         $scope.docente = { estado: "activo" };
         $scope.guardar = function() {
             if (!$scope.docente.numero_doc) {
                 alert("El número de documento es un campo requerido.")
                 return;
             }
             $http.post('/escuela/docentes/', $scope.docente)
                 .then(function(response) {
                         alert('docente cargado con éxito.');
                         window.location = "#/docente/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }
     };

     function ListadodocentesController($scope, $http) {
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
                     url: '/escuela/docentes/',
                     params: $scope.search
                 })
                 .then(function(response) {
                         $scope.docentes = (response.data);
                         if (response.data.length == 0) {
                             alert('No se encontró ningún docente.')
                         }
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
         };
         $scope.eliminar = function(id) {
             $http({
                     method: 'DELETE',
                     url: '/escuela/docentes/' + id + '/'
                 })
                 .then(function(response) {
                         alert("docente eliminado exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                         alert('Error eliminando docente.');
                     }
                 );
         };
     };
 })();