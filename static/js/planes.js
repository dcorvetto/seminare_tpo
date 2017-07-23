 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('PlanesModificar', ['$scope', '$http', '$routeParams', PlanesModificar]);
     app.controller('PlanesAlta', ['$scope', '$http', PlanesAlta]);
     angular.module('app').controller('ListadoPlanesController', ['$scope', '$http', ListadoPlanesController]);

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

     function PlanesModificar($scope, $http, $routeParams) {
         $http.get('/escuela/planes/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.plan = (response.data);
                     $scope.plan.plan = $scope.plan.plan.toString();
                 },
                 function() {
                     alert('Error buscando plan');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             if ($scope.plan.nombre.length > 100) {
                 alert("El nombre del plan puede tener hasta 100 caracteres.");
                 $scope.plan.nombre = "";
                 return;
             }
             if (!$scope.plan.nombre) {
                 alert("El nombre del plan es un campo requerido");
                 return;
             }
             $http.put('/escuela/planes/' + $routeParams.id + '/', $scope.plan)
                 .then(function(response) {
                         alert('plan modificado con éxito.');
                         window.location = "#/plan/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }

     }

     function PlanesAlta($scope, $http) {
         $scope.guardar = function() {
             if ($scope.plan.nombre.length > 100) {
                 alert("El nombre del plan puede tener hasta 100 caracteres.");
                 $scope.plan.nombre = "";
                 return;
             }
             if (!$scope.plan.nombre) {
                 alert("El nombre del plan es un campo requerido");
                 return;
             }
             $http.post('/escuela/planes/?format=json', $scope.plan)
                 .then(function(response) {
                         alert('plan cargado con éxito.');
                         window.location = "#/plan/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }
     };

     function ListadoPlanesController($scope, $http) {
         $scope.buscar = function() {
             $http({
                     method: 'GET',
                     url: '/escuela/planes/',
                     params: $scope.search
                 })
                 .then(function(response) {
                         $scope.planes = (response.data);
                         if (response.data.length == 0) {
                             alert('No se encontró ningún plan.')
                         }
                     },
                     function() {
                         alert('Error buscando planes.');
                     }
                 );
         };
         $scope.eliminar = function(id) {

             if (confirm("¿Está seguro que desea eliminarlo?"))
                 $http({
                     method: 'DELETE',
                     url: '/escuela/planes/' + id + '/'
                 })
                 .then(function(response) {
                         alert("plan eliminado exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                         alert('Error eliminando plan: el plan tiene cursos asociados.');
                     }
                 );
         };
     };
 })();