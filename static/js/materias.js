 (function() {
     'use strict';


     var app = angular
         .module('app');

     //app.controller('CursosModificar', ['$scope', '$http', '$routeParams', CursosModificar]);
     app.controller('MateriaAlta', ['$scope', '$http', MateriaAlta]);
     app.controller('ListadoMateriasController', ['$scope', '$http', ListadoMateriasController]);

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

     function MateriaAlta($scope, $http) {
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

     function ListadoMateriasController($scope, $http) {
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
 })();