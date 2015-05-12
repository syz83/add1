'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the myModalContent.html
 */
angular.module('add1App')
  .controller('ModalCtrl', function ($scope, $modalInstance, scoreBoard, $rootScope) {
  	$scope.rankName = {};
	  $scope.ok = function () {
	  	// $scope.$digest();
	  	if(!$scope.rankName.text){
	  		console.log($scope.rankName.text);
	  		$scope.noname = true;
	  	}
	  	else{
	  		console.log($scope.rankName.text);
	  		var newHighscore = new scoreBoard({
            	name : $scope.rankName.text,
            	highscore : $rootScope.score,
            	average: $rootScope.average
	  		});
            console.log(newHighscore);
            newHighscore.$save(function(){
            	scoreBoard.delete({_id:$rootScope.deleteUser});
            });
	    	$modalInstance.close(true);
	  	}
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };

  });
