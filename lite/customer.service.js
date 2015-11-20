'use strict';

angular.module('osipliteApp')
    .factory('Customer', function ($resource) {
        return $resource('api/customer/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'isNipExist': { method: 'GET', params:{id:"nipExist"}, isArray:false},
            'add': {method:'POST',params:{id:"add"}, isArray:false},
            'getWeeklyAddedCustomer': { method: 'GET', params:{id:"analytics"}, isArray: false}
        });
    });
