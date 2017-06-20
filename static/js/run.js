/**
 * Created by Juan Cruz on 5/23/2017.
 */
(function() {
    'use strict';

    var app = angular.module('app');
    app.run(['$http', '$rootScope', '$location', 'Login', run]);

    function run($http, $rootScope, $location, Login) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.logout = Login.logout;
        $rootScope.$on('$routeChangeStart', function(event) {

            if (!Login.isLoggedIn()) {
                $rootScope.displayLogout = false;
                if ($location.path() !== "/login") {
                    console.log('DENY : Redirecting to Login');
                    event.preventDefault();
                    $location.path('/login');
                }
            } else {
                $rootScope.displayLogout = true;
            }
        });
    };
})();