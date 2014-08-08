'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the add1App
 */
angular.module('add1App')
  .controller('GameCtrl', function ($scope, $interval, $modal) {

  	  var numChain = [0, 0, 0, 0];
  		var oldChain = [];
  		var uAns = [];
      var routineFirstHalf, routineSecondHalf;
      var progressBarTime = 5000;
      var init;
      $scope.run = true;
      $scope.progress = {
      value: 0,
      type: 'success'
      };
      $scope.progress2 = {
        value: 0,
        type: 'success'
      };
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
          var temp = [];
  	    	for(i = 0; i<nums.length; i++){
  	    		if(nums[i] === 9){
  	    			temp[i] = 0;
  	    		}
  	    		else{
  	    			temp[i] = nums[i] + 1;
  	    		}
  	    	}
  	    	return temp;
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

  	    var destroyRoutine = function(isFirst) {
          if(isFirst){
  	       	if(routineFirstHalf){
  	    	  	$interval.cancel(routineFirstHalf);
  	    		  routineFirstHalf = undefined;
              // console.log("destroy Routine 1");
  	     	  }
          }
          else{
            if(routineSecondHalf){
              $interval.cancel(routineSecondHalf);
              routineSecondHalf = undefined;
              // console.log("destroy Routine 2");
            }
          }  
  	    };

        //Called by init
        var setTimer = function() {
          $scope.progress.value = 100;
          $scope.progress2.value = 100;
          if($scope.run){
            $scope.run = false;
          }
          else{
            $scope.run = true;
          }
          // console.log($scope.progress.value);
        };

    var createRoutine2 = function(){
        routineSecondHalf = $interval(function() {
            //process answer
        readAnswer($scope.userAnswer);
        if(!check(uAns, add1(oldChain))){
          destroyRoutine(0);
          // if($scope.numCorrect > BoardService.lowestRank().highscore){
            //call modal
            $modal.open({
            templateUrl: '/templates/myModalContent.html',
            controller: 'ModalCtrl',
            size: 'lg'
          });
          // }
          // console.log(uAns);
          // console.log(numChain);
        }
        else{
          //reset oldChain
          $scope.numCorrect++;
          oldChain=[];
          $scope.userAnswer='';
          $scope.progress.value = 0;
          $scope.progress2.value = 0;
          //call init to run next number
          destroyRoutine(0);
          init();
          }
      }, progressBarTime/2);
    };

    var createRoutine1 = function(){
        routineFirstHalf = $interval(function() {
            //process answer
        readAnswer($scope.userAnswer);
        if(!check(uAns, add1(oldChain))){
          //isFirst == 1 
          destroyRoutine(1);
          $scope.progress.type = 'danger';
          $scope.progress2.type = 'danger';
          createRoutine2();
        }
        else{
          //reset oldChain
          $scope.numCorrect+=2;
          oldChain=[];
          $scope.userAnswer='';
          $scope.progress.value = 0;
          $scope.progress2.value = 0;
          //call init to run next number
          init();
          }
      }, progressBarTime/2);
    };

  	 init = function(){
      $scope.progress.type = 'success';
      $scope.progress2.type = 'success';
			for(var i = 0; i<4; i++){
  	    		numChain[i] = Math.floor((Math.random() * 10));
  	    	}
  	    	//display number
			$scope.num1 = numChain[0];
			$scope.num2 = numChain[1];
			$scope.num3 = numChain[2];
			$scope.num4 = numChain[3];
      //start progress bar timer
      setTimer();
      //start routineFirstHalf if hasn't been started before
      if(!routineFirstHalf)
        createRoutine1();
			deepCopy(oldChain, numChain);
		};

    //initialize first
		init();

  });
