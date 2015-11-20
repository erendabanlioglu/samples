'use strict';

angular.module('osipliteApp')
    .factory('errorHandlerInterceptor', function ($q, $rootScope,$injector) {
        return {
            'responseError': function (response) {
                var stateService = $injector.get('$state');
                if (!(response.status == 401 && response.data.path.indexOf("/api/account") == 0 )){
	                $rootScope.$emit('osipliteApp.httpError', response);
	            }
	            if (response.status == 403){
                    stateService.go('accessdenied');
                }
	            if(response.data.message === "403 Forbidden"){ //logout On Forbidden Requests To Osip
                    var AuthService = $injector.get('Auth');
                    AuthService.logout();
                    stateService.go('login');
                }

                return $q.reject(response);
            }
        };
    });
