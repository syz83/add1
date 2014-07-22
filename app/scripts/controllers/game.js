'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the add1App
 */
angular.module('add1App')
  .controller('GameCtrl', function ($scope, $interval) {

  	  	var numChain = [0, 0, 0, 0];
  		var oldChain = [];
  		var uAns = [];
  		$scope.numCorrect = 0;

  		// var tries = 1;


		var deepCopy = function(copy, original){
			for(var i = 0; i<original.length; i++){
				copy.push(original[i]);
			}
		};

  	    var readAnswer = function(userAnswer){
  	    	if(!userAnswer){
  	    		uAns = null;
  	    	}
  	    	else{
  	    		uAns = userAnswer.split('').map(Number);
  	    	}
  	    };

  	    var add1 = function(nums){
  	    	var i;
  	    	for(i = 0; i<nums.length; i++){
  	    		if(nums[i] === 9){
  	    			nums[i] = 0;
  	    		}
  	    		else{
  	    			nums[i]++;
  	    		}
  	    	}
  	    	return nums;
  	    };

  	    var check = function(userAnswer, answer){
  	    	if(!userAnswer){
  	    		return false;
  	    	}
  	    	if(userAnswer.length !== answer.length){
  	    		return false;
  	    	}
  	    	for(var i = 0; i<answer.length; i++){
  	    		if(userAnswer[i] !== answer[i]){
  	    			return false;
  	    		}
  	    	}
  	    	return true;
  	    };

  	    var destroyRoutine = function() {
  	    	if(routine){
  	    		$interval.cancel(routine);
  	    		routine = undefined;
  	    	}
  	    };

  	    var init = function(){
			for(var i = 0; i<4; i++){
  	    		numChain[i] = Math.floor((Math.random() * 10));
  	    	}
  	    	//display number
			$scope.num1 = numChain[0];
			$scope.num2 = numChain[1];
			$scope.num3 = numChain[2];
			$scope.num4 = numChain[3];
			deepCopy(oldChain, numChain);
		};

		init();

  	   	var routine = $interval(function() {
  	    	//process answer
			readAnswer($scope.userAnswer);
			if(!check(uAns, add1(oldChain))){
				destroyRoutine();
				console.log(uAns);
				console.log(numChain);
				// TODO: print text that says score
			}
			else{
				//reset oldChain
				$scope.numCorrect++;
				oldChain=[];
				$scope.userAnswer='';
  				init();
  			}

		}, 5000);
  });
