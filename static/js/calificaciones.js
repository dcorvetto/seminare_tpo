 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('CalificacionesModificar', ['$scope', '$http', '$routeParams', calificacionesModificar]);
     app.controller('CalificacionesAlta', ['$scope', '$http', calificacionesAlta]);
     angular.module('app').controller('ListadoCalificacionesController', ['$scope', '$http', ListadocalificacionesController]);

     function cargarAlumnos($scope, $httpm, nombre, dni) {
         $http.get('/escuela/alumnos/')
             .then(function(response) {
                     $scope.alumnos = (response.data);
                 },
                 function() {
                     alert('Error buscando alumnos');
                 }
             );
     }

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

     function cargarMaterias($scope, $http) {
         $http.get('/escuela/materias/')
             .then(function(response) {
                     $scope.materias = (response.data);
                 },
                 function() {
                     alert('Error buscando materias');
                 }
             );
     }

     function calificacionesModificar($scope, $http, $routeParams) {
         $http.get('/escuela/calificaciones/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.calificacion = (response.data);
                     $scope.alumnos = [$scope.calificacion.alumno];

                     $scope.alumno = $scope.calificacion.alumno;
                 },
                 function() {
                     alert('Error buscando calificacion');
                     window.location = "#/"
                 }
             );
         $scope.deshabilitado = true;
         $scope.guardar = function() {
             if (!$scope.alumno || !$scope.curso || !$scope.materia || !$scope.calificacion.nota || !$scope.calificacion.tipo) {
                 alert("Todos los campos son obligatorios.");
                 return;
             }
             if ($scope.calificacion.nota < 1 || $scope.calificacion.nota > 10) {
                 alert("Ingresar nota entre 1 y 10");
                 return;
             }
             $scope.calificacion.alumno = $scope.alumno.id;
             $scope.calificacion.curso = $scope.curso.id;
             $scope.calificacion.docente = $scope.materia.docente.id;
             $scope.calificacion.materia = $scope.materia.id;
             $http.put('/escuela/calificaciones/' + $routeParams.id + '/', $scope.calificacion)
                 .then(function(response) {
                         alert('calificación modificada con éxito.');
                         window.location = "#/calificacion/listar/"
                     },
                     function(response) {}
                 );
         }

     }

     function calificacionesAlta($scope, $http) {
         $scope.search = {};
         $scope.calificacion = {};
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
         $scope.guardar = function() {
             if (!$scope.alumno || !$scope.curso || !$scope.materia || !$scope.calificacion.nota || !$scope.calificacion.tipo) {
                 alert("Todos los campos son obligatorios.");
                 return;
             }
             if ($scope.calificacion.nota < 1 || $scope.calificacion.nota > 10) {
                 alert("Ingresar nota entre 1 y 10");
                 return;
             }
             $scope.calificacion.alumno = $scope.alumno.id;
             $scope.calificacion.curso = $scope.curso.id;
             $scope.calificacion.docente = $scope.materia.docente.id;
             $scope.calificacion.materia = $scope.materia.id;
             $http.post('/escuela/calificaciones/?format=json', $scope.calificacion)
                 .then(function(response) {
                         alert('calificacion cargada con éxito.');
                         window.location = "#/calificacion/listar"
                     },
                     function(response) {
                         alert("Ese alumno ya tiene una calificación de este tipo para esta materia y curso.");
                     }
                 );
         }
     };

     function ListadocalificacionesController($scope, $http) {
         cargarCursos($scope, $http);
         cargarMaterias($scope, $http);
         $scope.search = {};
         $scope.buscar = function() {
             Object.keys($scope.search).map(function(key, index) {
                 if (!$scope.search[key]) {
                     delete $scope.search[key];
                 }
             });
             $http({
                     method: 'GET',
                     url: '/escuela/calificaciones/',
                     params: $scope.search
                 })
                 .then(function(response) {
                         $scope.calificaciones = (response.data);
                         if (response.data.length == 0) {
                             alert('No se encontró ningúna calificación.')
                         }
                     },
                     function() {
                         alert('Error buscando calificaciones.');
                     }
                 );
         };

         $scope.eliminar = function(id) {
             if (confirm("¿Está seguro que desea eliminarla?"))
                 $http({
                     method: 'DELETE',
                     url: '/escuela/calificaciones/' + id + '/'
                 })
                 .then(function(response) {
                         alert("Calificación eliminada exitosamente.")
                         $scope.buscar()
                     },
                     function() {
                         alert('Error eliminando calificación.');
                     }
                 );
         };
     };
 })();