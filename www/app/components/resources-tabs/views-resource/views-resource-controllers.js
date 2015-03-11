/* Controllers of apiServicesControllers component */
//______________________________________________

var ViewsResourceControllers = angular.module('resources.views-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Views Resource Controller */
ViewsResourceControllers.controller('ResourcesViewsResourceCtrl', 
		   ['$scope', 'ViewsResource', 'drupalApiNotificationChannel', 
    function($scope,   ViewsResource,   drupalApiNotificationChannel) {
			   
			   $scope.toggleRequest = function(request) {
				     if ($scope.isRequestShown(request)) {
				       $scope.shownRequest = null;
				     } else {
				       $scope.shownRequest = request;
				     }
			   };
			
			   $scope.isRequestShown = function(request) {
			     return $scope.shownRequest === request;
			   };
			   
			   //
			   //ViewsResource
			   //
			   
			   var requestEnd = requestStart = undefined;
			   
			   //Retrieve
			   $scope.viewsRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.viewsRetrieve = {};
			   $scope.viewsRetrieve.view_name = 'testview';
			   $scope.viewsRetrieve.display_id = 'page_1';
			   $scope.viewsRetrieve.args = '?????';
			   $scope.viewsRetrieve.offset = '1';
			   $scope.viewsRetrieve.limit = '2';
			   $scope.viewsRetrieve.format_output = '1';
			   $scope.viewsRetrieve.filters = "?????";

			   $scope.callViewsRecourceRetrieve = function(viewsRetrieve) {
				   requestStart = Date.now();
		
				   ViewsResource.retrieve(viewsRetrieve.view_name, viewsRetrieve.display_id, viewsRetrieve.args, viewsRetrieve.offset, viewsRetrieve.limit, viewsRetrieve.format_output,  viewsRetrieve.filters ).then(
						//conncet success
				    	function(data) { console.log('views retrieve success'); },
				    	//conncet error
				    	function(data) { console.log('views retrieve error'); }
				    );
			   };		
			   //
			   drupalApiNotificationChannel.onViewsRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onViewsRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			
			  
}]);


