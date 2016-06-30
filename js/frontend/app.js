
requirejs.config({
    paths: {
        'angular': '/vendors/angular/angular.min',
        'angular-route': '/vendors/angular/angular-route',
        'angularAMD': '/vendors/angularAMD/angularAMD',
        'bootstrap-js': '/vendors/bootstrap/dist/js/bootstrap.min',
        'jquery': '/vendors/jquery/dist/jquery.min'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angularAMD': {
            deps: ['angular']
        },
        'bootstrap-js': {
            deps: ['jquery']
        }
    },

    deps: [
        'bootstrap-js',
        'personalCabinetModule'
    ]
});