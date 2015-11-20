'use strict';

angular.module('osipliteApp')
    .controller('CustomerController', function ($rootScope, $scope, Upload, $timeout,Customer,Scenario,Dictionary,$loading,$state,Auth,$filter,$parse) {
        
        $loading.start('addCustomer');

        $scope.customerOrigins = Dictionary.get({dictionaryCode: 'CUSTOMER_ORIGIN',languageCode:"PL"},function(success){
            $scope.customerOrigin = $scope.customerOrigins[0].code;
            $timeout(function() {$('#customerOrigin').val($scope.customerOrigin); }); //Firefox bugfix for init default select value
      
        },function(error){});
            
        $scope.scenariosList = Scenario.get({value:'active'},function(success){
            $loading.finish('addCustomer');
            $scope.newCustomerDTO.scenarioId = $scope.scenariosList[0].main.id.toString(); // angular ng-repeat empty option fix "toString()"
            $timeout(function() { $('#scenarioId').val($scope.newCustomerDTO.scenarioId); }); //Firefox bugfix for init default select value
        },function(error){});
  
        Customer.add($scope.newCustomerDTO, function(response) {
            $loading.finish('addCustomer');
            $scope.customerAdded = true;
            if($scope.uploadedImages.length>0){
                 Upload.upload({
                    url: 'api/attachment',
                    data: {
                        files: $scope.uploadedImages,
                        'customerId':response.customerDTO.id
                    }
                }).success(function (data, status, headers, config) {
                    console.log('file uploaded. Response: ' + data);
                    initAnalytics(Customer,$scope,$state,Auth,$filter); // refresh analytics
                });
            }
  
        },function(error){
            $loading.finish('addCustomer');
        });
    });

