.config(['$httpProvider', function($httpProvider) {
	var interceptor = [ '$q', 'toaster', function($q, toaster) {
		function success(response) {
		    if(response.config.url.split('.')[1] !=  'html') // loading html counts as requests
		        //do sth

		    if (response.data.code != undefined && response.data.message != undefined) {
        		if (response.data.code == "0200") toaster.pop('success', "The operation completed successfully", response.data.message);
				    if (response.data.code == "0409") toaster.pop('konflikt', "Operation not permitted", response.data.message);
      	}

            //when returning List of messageResource from controller
        	if(response.data != undefined && Array.isArray(response.data) && response.data.length > 0){
        	    var data = response.data;
        	    for(var i = 0; i < data.length; i++){
        	        if (data[i].code != undefined && data[i].message != undefined) {
        	            if (data[i].code == "0200") toaster.pop('success', "The operation completed successfully", data[i].message);
        	            if (data[i].code == "0500") toaster.pop('error', "An Application Error Occurred", data[i].message);
        	        }
        	    }
        	}

			return response;
		}

		function error(response) {
		    if(response.config.url.split('.')[1] !=  'html')  // loading html counts as requests
		        //do sth
		        
			if (response.status === 403) {
				window.location.replace("");
				return deferred.promise;
			}
			if (response.data.code != undefined && response.data.message != undefined) {
			if (response.data.code == "500") toaster.pop('error', "An Application Error Occurred", response.data.message);
			else if (response.data.code == "0404") toaster.pop('error', "No object found", response.data.message);
			else if (response.data.code == "0401") toaster.pop('error', "Invalid data", response.data.message);
			}
			// otherwise, default behaviour

			return $q.reject(response);
		}

		return function(promise) {
			return promise.then(success, error);
		};

	}];
	$httpProvider.responseInterceptors.push(interceptor);
}])
