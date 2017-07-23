 (function() {
     'use strict';


     var app = angular
         .module('app');

     //app.controller('CursosModificar', ['$scope', '$http', '$routeParams', CursosModificar]);
     app.controller('MateriaAlta', ['$scope', '$http', MateriaAlta]);
     app.controller('MateriaModificar', ['$scope', '$http', '$routeParams', MateriaModificar]);
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

     function cargarDocentes($scope, $http) {
         $http.get('/escuela/docentes/')
             .then(function(response) {
                     $scope.docentes = (response.data);
                 },
                 function() {
                     alert('Error buscando planes');
                 }
             );
     }

     function MateriaModificar($scope, $http, $routeParams) {
         cargarPlanes($scope, $http);
         cargarDocentes($scope, $http);
         $http.get('/escuela/materias/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.materia = (response.data);
                     $scope.materia.plan = $scope.materia.plan.toString();
                     $scope.materia.docente = $scope.materia.docente.toString();
                 },
                 function() {
                     alert('Error buscando materia');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             $http.put('/escuela/materias/' + $routeParams.id + '/', $scope.materia)
                 .then(function(response) {
                         alert('Materia cargada con éxito.');
                         window.location = "#/materia/listar"
                     },
                     function(response) {
                         alert(response.status);
                     }
                 );
         }
     };

     function MateriaAlta($scope, $http) {
         cargarPlanes($scope, $http);
         cargarDocentes($scope, $http);
         $scope.guardar = function() {
             $http.post('/escuela/materias/?format=json', $scope.materia)
                 .then(function(response) {
                         alert('Materia cargado con éxito.');
                         window.location = "#/materia/listar"
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

             if (confirm("¿Está seguro que desea eliminarla?"))
                 $http({
                     method: 'DELETE',
                     url: '/escuela/materias/' + id + '/'
                 })
                 .then(function(response) {
                         alert("Materia eliminada exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                        alert('Error eliminando materia: la materia tiene calificaciones asociadas');
                     }
                 );
         };
     }
 })();