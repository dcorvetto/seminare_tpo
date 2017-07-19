 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('CursosModificar', ['$scope', '$http', '$routeParams', CursosModificar]);
     app.controller('CursosAlta', ['$scope', '$http', CursosAlta]);
     angular.module('app').controller('ListadoCursosController', ['$scope', '$http', ListadoCursosController]);

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

     function CursosModificar($scope, $http, $routeParams) {

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
                         alert(response.data.reduce(function(e) { return e + '\n'; }));
                     }
                 );
         }

     }

     function CursosAlta($scope, $http) {
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
     };

     function ListadoCursosController($scope, $http) {
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

             if (confirm("¿Está seguro que desea eliminarlo?"))
                 $http({
                     method: 'DELETE',
                     url: '/escuela/cursos/' + id + '/'
                 })
                 .then(function(response) {
                         alert("Curso eliminado exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                         alert('Error eliminando curso: el curso tiene inscripciones asociadas.');
                     }
                 );
         };
     };
 })();