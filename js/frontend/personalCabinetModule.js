
define([
    'angular',
    'angularAMD',
    'angular-route',
    'Router/personalCabinetRouter',
    'Home/controllers',
    'Home/directives',
    'Home/services'
], function (angular, angularAMD, angularRoute, routeProvider, homeControllers, homeDirectives, homeServices) {

    var appName = 'personalCabinetApp',
        app = angular.module(appName, ['ngRoute'])
            .controller('RegistrationPageMainCtrl', homeControllers.registrationPageMainCtrl)
            .factory('authenticationService', homeServices.authenticationService)
            .directive('neofitPassword', homeDirectives.neofitPassword)
            .directive('showPassword', homeDirectives.showPassword)
            .config(routeProvider);

    angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
});