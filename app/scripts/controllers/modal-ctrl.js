'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the myModalContent.html
 */
angular.module('add1App')
  .controller('ModalCtrl', function ($scope, $modalInstance, RankService) {
  	$scope.rankData = {};

	// //find the place of the highscore
	// var findPlace = function(highscore){
	// 	for(var i = 1; i <= 10; i++){
	// 		var hi = RankService.get({place:i}).then(function(rank){
	// 			return rank.highscore;
	// 		});
	// 		if(highscore > hi)
	// 			return i;
	// 	}
	// };
 //  	var getRankbyPlace = function(placeVal){
	// 	return RankService.get({place:placeVal}).then(function(rank){
	// 			return rank;
	// 		});
	// };
	// //replace rank1 with rank2
	// var replaceRank = function(rank1, rank2){
	// 	rank1.place = rank2.place;
	// 	rank1.highscore = rank2.highscore;
	// 	rank1.name = rank2.name;
	// 	rank1.$save();
	// };
	// var shiftRanks = function(highscore, name, place){
	// 	for(var i=10; i>place; i--){
	// 		// copyRank(temp, getRankbyPlace(i+1));
	// 		replaceRank(getRankbyPlace(i), getRankbyPlace(i-1));
	// 	}
	// 	getRankbyPlace(place).highscore=highscore;
	// 	getRankbyPlace(place).name=name;
	// 	getRankbyPlace(place).place=place;
	// 	getRankbyPlace.$save();
	// };

 //    $scope.lowestRank = function(){
	// 		console.log("call lowestRank");
	// 		console.log(RankService.get({place:10}).highscore);
	// 		return RankService.get({place:10}).then(function(rank){
	// 			return rank;
	// 		});
	// 	};

 //  	$scope.insertRank = function(highscore, name){
 //    			// console.log("inserting rank with name: " + name);
 //    			var lowestRank = lowestRank();
 //    			if(highscore > lowestRank.highscore){
 //    				// console.log("greater than lowest rank");
 //    				var place = findPlace(highscore);
 //    				// console.log("found place: " + place);
 //    				shiftRanks(highscore, name, place);
 //    			}
 //    			else{
 //    				return false;
 //    			}
 //    		};

	  $scope.ok = function () {
	  	// $scope.$digest();
	  	if(!$scope.rankData.name){
	  		// console.log($scope.rankName.text);
	  		// console.log("Hello");
	  		$scope.noname = true;
	  	}
	  	else{
	  		// console.log($scope.rankName.text);
	  		$scope.rankData.place = 3;
	  		$scope.rankData.highscore = 47;
	  		console.log($scope.rankData);
	  		RankService.insertRank($scope.rankData);
	    	$modalInstance.close(true);
	  	}
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };

  });
