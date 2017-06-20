(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', ['$scope', '$location', 'Login', LoginController]);

    function LoginController($scope, $location, Login) {
        $scope.login = function() {
            Login.login($scope.user)
                .then(function() {
                        $location.url('/');
                    },
                    function() {
                        $scope.login_error = "Usuario o contraseña incorrectos.";
                    })
        }


        if (Login.isLoggedIn()) {
            $location.url('/');
        }

    }

})();