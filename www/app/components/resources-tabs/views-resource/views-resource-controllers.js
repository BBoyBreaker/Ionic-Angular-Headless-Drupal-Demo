/* Controllers of apiServicesControllers component */
//______________________________________________

var ViewsResourceControllers = angular.module('resources.views-resource.controllers', ['ViewsResourceModules']);


/* Views Resource Controller */
ViewsResourceControllers.controller('ResourcesViewsResourceCtrl', 
		   ['$scope', 'ViewsResource', 'ViewsResourceChannel', 
    function($scope,   ViewsResource,   ViewsResourceChannel) {
			   
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
			   $scope.viewsRetrieve.display_id = 'page';
			   $scope.viewsRetrieve.args = '';
			   $scope.viewsRetrieve.offset = '1';
			   $scope.viewsRetrieve.limit = '2';
			   $scope.viewsRetrieve.format_output = '0';
			   $scope.viewsRetrieve.filters = "";
			   $scope.viewsRetrieve.exp_filters = 'comment_count=4';
			   $scope.viewsRetrieve.exp_sort = "sort_by=created&sort_order=ASC";

			   $scope.callViewsRecourceRetrieve = function(viewsRetrieve) {
				   requestStart = Date.now();
		
				   ViewsResource.retrieve(viewsRetrieve.view_name, viewsRetrieve.display_id, viewsRetrieve.args, viewsRetrieve.offset, viewsRetrieve.limit, viewsRetrieve.format_output,  viewsRetrieve.exp_filters, viewsRetrieve.exp_sort  ).then(
						//conncet success
				    	function(data) { console.log('views retrieve success'); },
				    	//conncet error
				    	function(data) { console.log('views retrieve error'); }
				    );
			   };		
			   //
			   ViewsResourceChannel.onViewsRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   ViewsResourceChannel.onViewsRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			
			  
}]);


