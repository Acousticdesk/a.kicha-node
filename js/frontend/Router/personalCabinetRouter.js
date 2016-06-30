
define([], function (application) {
    var routeProvider = function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/homeRouteTemplate.html',
                controller: 'RegistrationPageMainCtrl'
            });
    };

    return routeProvider;
});