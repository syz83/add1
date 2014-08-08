(function(angular) {
    "use strict";

    var app = angular.module('add1App');

    app.factory('RankService', function($resource, $http){

    	return {
			
			getAll: function(){
				return $resource('/api/ranks');
			},

			// when submitting the add form, send the text to the node API
		insertRank : function(rankData) {
		$http.post('/api/insert', rankData)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log("Here is the error");
				console.log('Error: ' + data);
			});
		},

			// delete a todo after checking it
	deleteRank : function(place) {
		$http.delete('/api/delete/' + place)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

		};

    });

})(window.angular);