'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the add1App
 */
angular.module('add1App')
  .controller('GameCtrl', function ($scope, $interval, $modal, $timeout, BoardService) {

  	  var numChain = [0, 0, 0, 0];
  		var oldChain = [];
  		var uAns = [];
      var routineFirstHalf, routineSecondHalf;
      var progressBarTime = 5000;
      var init;
      var isFirst = 1;
      var timer1, timer2;
      var timer;
      $scope.time = 10;
      var initTime = 0,
      display = $('#timer');
    display.text("Time Left: " + initTime);
      $scope.run = false;
      // $scope.progress = {
      // value: p1,
      // type: 'success'
      // };
      // $scope.progress2 = {
      //   value: p2,
      //   type: 'success'
      // };
      $scope.value1 = 0;
      $scope.value2 = 0;
      $scope.type1 = "success";
      $scope.type2 = "success";
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

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text("Time Left : " + minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
    

    // var createRoutine2 = function(){
    //   console.log("Create Routine 2");
    //   // $timeout(function(){
    //     $scope.type1 = 'danger';
    //     $scope.type2 = 'danger';
    //   // }, 0, true)
    //   timer2 = doTimer(2500, 20, function(steps){
    //       initTime-=Math.round((5/steps) * 100) / 100;
    //       display.text("Jank Timer: " + initTime);
    //       readAnswer($scope.userAnswer);
    //      if(check(uAns, add1(oldChain))){
    //         $scope.numCorrect+=initTime;
    //         //reset oldChain
    //         oldChain=[];
    //         $scope.userAnswer='';
    //         init();
    //     }
    //   },function(){
    //     // $scope.value1 = 100;
    //     // $scope.value2 = 100;
    //     //show endgame
    //     console.log("Game Over");
    //     $("progress-bar").css("transition", "none");
    //     console.log($scope.value1);
    //     console.log($scope.value2);

    //   })
    // }

    var createRoutine = function(){
      console.log("Create Routine 1");

      timer1 = doTimer(5000, 20, function(steps){
          initTime-=Math.round((10/steps) * 100) / 100;
          display.text("Jank Timer: " + initTime);
          readAnswer($scope.userAnswer);
         if(check(uAns, add1(oldChain))){
            console.log("Correct!");

            $scope.$apply(function(){
              init();
            });
        }
      },function(){
        display.text("Game Over!");
      })
    }

  	 init = function(){
         if(timer1!=null)
           timer1.destroy();
          $scope.numCorrect+=initTime;
          //reset oldChain  
          oldChain=[];
          $scope.userAnswer='';
         // if(timer2!=null)
         //   timer2.destroy();
         initTime = 10;
         console.log("init");
          // console.log($scope.value1);
          // console.log($scope.value2);
        // })
			for(var i = 0; i<4; i++){
  	    		numChain[i] = Math.floor((Math.random() * 10));
  	    	}
  	    	//display number
			$scope.num1 = numChain[0];
			$scope.num2 = numChain[1];
			$scope.num3 = numChain[2];
			$scope.num4 = numChain[3];
      //start progress bar timer
      // setTimer();
      //start routineFirstHalf if hasn't been started before
      // if(!routineFirstHalf)

       createRoutine();
			deepCopy(oldChain, numChain);
		};

    //initialize first
		 init();
    //createRoutine();

  });


