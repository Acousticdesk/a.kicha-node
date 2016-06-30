define([], function () {

    var homeServices = {};

    homeServices.authenticationService = function ($http, $timeout) {
        var auth = {};

        auth.statuses = {};
        auth.statuses.registration = {};
        auth.statuses.registration.errors = {};
        auth.statuses.registration.success = false;
        auth.statuses.registration.errors.userAlreadyExists = false;

        auth.createAccount = function (clientData) {
            console.log('Trying to post to server data: ', clientData);

            $http({
                method: 'POST',
                url: 'http://127.0.0.1:3000/users/create',
                data: clientData
            }).then(
                function success (data) {
                    console.log(data, 'This is servers ok response');
                    auth.statuses.registration.success = true;
                },
                function error (err) {
                    console.log(err, 'This is servers error');
                    auth.statuses.registration.errors.userAlreadyExists = true;
                    $timeout(function () {auth.statuses.registration.errors.userAlreadyExists = false}, 5000);
                }
            );
            // console.log('Creating account... Done.');
        };

        return auth;
    };

    return homeServices;

});