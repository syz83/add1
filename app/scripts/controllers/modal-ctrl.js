'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the myModalContent.html
 */
angular.module('add1App')
  .controller('ModalCtrl', function ($scope, $modalInstance) {
  	$scope.rankName = {};
	  $scope.ok = function () {
	  	// $scope.$digest();
	  	if(!$scope.rankName.text){
	  		console.log($scope.rankName.text);
	  		console.log("Hello");
	  		$scope.noname = true;
	  	}
	  	else{
	  		console.log($scope.rankName.text);
	    	$modalInstance.close(true);
	  	}
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };

  });
