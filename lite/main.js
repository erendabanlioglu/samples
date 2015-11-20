'use strict';

angular.module('osipliteApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    roles: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    },
                    'newCustomer@home': {
                        templateUrl: 'scripts/app/entities/customer/newCustomer.html',
                        controller: 'CustomerController'
                    }

                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('customer');
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });

    });

