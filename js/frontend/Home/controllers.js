
define([], function () {
    var homeControllers = {};

    homeControllers.registrationPageMainCtrl = ['$scope', 'authenticationService', function ($scope, authenticationService) {

        $scope.neofit = {};
        $scope.neofit.mail = '';
        $scope.neofit.password = '';



        $scope.account = {};
        $scope.account.mail = '';
        $scope.account.password = '';



        $scope.authenticationService = {};
        $scope.authenticationService.errors = {};
        $scope.authenticationService.errors.userAlreadyExists = false;

        $scope.authenticationService.watchSuccessRegistration = function () {
            return authenticationService.statuses.registration.success;
        };
        $scope.authenticationService.watchFailRegistration = function () {
            return authenticationService.statuses.registration.errors.userAlreadyExists;
        };



        $scope.createAccount = function () {
            authenticationService.createAccount({
                login: $scope.neofit.mail,
                password: $scope.neofit.password
            });
        };

        $scope.authenticate = function () {
            //
        };



        $scope.$watch('neofit.password', handleNeofitPasswordWatcher);

        $scope.$watchGroup([
            $scope.authenticationService.watchSuccessRegistration,
            $scope.authenticationService.watchFailRegistration
        ], handleAuthenticationGroupWatcher);



        function handleNeofitPasswordWatcher (newValue, oldValue) {
            // console.log($scope.registration_form.neofit_password);
        }

        function handleAuthenticationGroupWatcher (newValues, oldValues) {
            console.log('This is new values from watcher: ', newValues);
        }

    }];

    return homeControllers;
});
