 (function() {
     'use strict';


     var app = angular.module('app');

     app.controller('InscripcionesModificar', ['$scope', '$http', '$routeParams', InscripcionesModificar]);
     app.controller('InscripcionAlta', ['$scope', '$http', InscripcionesAlta]);
     angular.module('app').controller('ListadoInscripcionesController', ['$scope', '$http', ListadoInscripcionesController]);

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

     function InscripcionesModificar($scope, $http, $routeParams) {

         cargarPlanes($scope, $http);
         $http.get('/escuela/inscripciones/' + $routeParams.id + '/')
             .then(function(response) {
                     $scope.inscripcion = (response.data);
                     $scope.inscripcion.plan = $scope.inscripcion.plan.toString();
                 },
                 function() {
                     alert('Error buscando inscripción');
                     window.location = "#/"
                 }
             );
         $scope.guardar = function() {
             $http.put('/escuela/inscripciones/' + $routeParams.id + '/', $scope.inscripcion)
                 .then(function(response) {
                         alert('inscripción modificada con éxito.');
                         window.location = "#/inscripcion/listar"
                     },
                     function(response) {
                         alert("Error al guardar inscripción.");
                     }
                 );
         }

     }

     function InscripcionesAlta($scope, $http) {
         $scope.search = {};
         $scope.inscripcion = {
             estado_pase: "No aplica"
         };
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
                         cargarCursos($scope, $http);
                     },
                     function() {
                         alert('Error buscando Alumnos.');
                     }
                 );
         };
         $scope.guardar = function() {
             if ($scope.inscripcion.estado_pase == "Pendiente") {
                 $scope.inscripcion.estado = "En espera";
             } else {
                 $scope.inscripcion.estado = "Confirmada";
             }

             var curso = $scope.cursos.filter(function(e) { return e.id == $scope.inscripcion.curso; })[0];
             if (curso.inscripciones.filter(function(e) { return e.estado == "Confirmada" }).length > 4) {
                 alert("El curso tiene 4 inscripciones confirmadas, la inscripción quedará en espera.");
                 $scope.inscripcion.estado = "En espera";
             }
             $scope.inscripcion.alumno = $scope.alumno.id;
             $http.post('/escuela/inscripciones/?format=json', $scope.inscripcion)
                 .then(function(response) {
                         $http.put('/escuela/alumnos/' + $scope.alumno.id + '/', $scope.alumno)
                             .then(function(response) {},
                                 function(response) {}
                             );
                         alert('inscripción cargada con éxito.');
                         window.location = "#/inscripcion/listar"
                     },
                     function(response) {}
                 );
         }
     };

     function ListadoInscripcionesController($scope, $http) {

         cargarCursos($scope, $http);

         $scope.buscar = function() {
             Object.keys($scope.search).map(function(key, index) {
                 if (!$scope.search[key]) {
                     delete $scope.search[key];
                 }
             });
             $http({
                     method: 'GET',
                     url: '/escuela/inscripciones/',
                     params: $scope.search
                 })
                 .then(function(response) {
                         $scope.inscripciones = (response.data);
                         if (response.data.length == 0) {
                             alert('No se encontró ningún inscripción.')
                         }
                     },
                     function() {
                         alert('Error buscando inscripciones.');
                     }
                 );
         };
         $scope.guardar = function(inscripcion) {
             inscripcion.curso = inscripcion.curso.id;
             inscripcion.alumno = inscripcion.alumno.id;
             $http.put('/escuela/inscripciones/' + inscripcion.id + '/', inscripcion)
                 .then(function(response) {
                         $scope.buscar();
                     },
                     function(response) {
                         $scope.buscar();
                     }
                 );
         };
     };
 })();