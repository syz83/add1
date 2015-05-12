'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the add1App
 */
angular.module('add1App')
  .controller('GameCtrl', function ($scope, $interval, $modal, $timeout, scoreBoard, $rootScope) {

  	  var numChain = [0, 0, 0, 0];
  		var oldChain = [];
  		var uAns = [];
      var progressBarTime = 5000;
      var init;
      var timer1;
      $scope.time = 10;
      var initTime = 0;
      var correct = false;
      var display = $('#timer');
      display.text("Time Left: " + initTime);
      $scope.run = false;
      $scope.value1 = 0;
      $scope.value2 = 0;
      $scope.type1 = "success";
      $scope.type2 = "success";
  		$scope.numCorrect = 0;
      $scope.totalPoints = 0;
      $scope.average = 0;
      var playing = true;


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

function doTimer(length, resolution, oninstance, oncomplete)
{
    var steps = (length / 100) * (resolution / 10),
        speed = length / steps,
        count = 0,
        start = new Date().getTime();

    function instance()
    {
        if(count++ == steps)
        {
            oncomplete(steps, count);
        }
        else
        {
            if(!correct){
              oninstance(steps, count);
              var diff = (new Date().getTime() - start) - (count * speed);
              window.setTimeout(instance, (speed - diff));
            }
            else{
              $scope.$apply(function(){
                $scope.numCorrect++;
                correct = false;
                init();
              });
            }
        }
    }

    window.setTimeout(instance, speed);
}

function orderByScore(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  }

    var createRoutine = function(){
      console.log("Create Routine 1");
      initTime = 5000;
      timer1 = doTimer(5000, 20, function(steps){
          initTime-=5000/steps;
          display.text("Jank Timer: " + initTime);
          readAnswer($scope.userAnswer);
         if(check(uAns, add1(oldChain))){
            correct = true;
        }
      },function(){
        display.text("Game Over!");
        playing = false;
        scoreBoard.query(function(highscores){
          //console.log(highscores);
          var orderedhighscores = orderByScore(highscores, 'highscore', false);
          //console.log(orderedhighscores[0]);
          if($scope.totalPoints > orderedhighscores[0].highscore){
            //console.log(orderedhighscores[0]._id);
            $rootScope.score = $scope.totalPoints;
            $rootScope.average = $scope.average;
            //console.log("Call delete");
            $rootScope.deleteUser = orderedhighscores[0]._id;
            //scoreBoard.delete({_id:orderedhighscores[0]._id});
            //call modal
              $modal.open({
              templateUrl: '/templates/myModalContent.html',
              controller: 'ModalCtrl',
              size: 'lg'
            });
        }
        });
      })
    }

  	 init = function(){
          $scope.totalPoints+=initTime;
          $scope.average = $scope.totalPoints/$scope.numCorrect;
          //reset oldChain  
          oldChain=[];
          $scope.userAnswer='';

         console.log("init");

			for(var i = 0; i<4; i++){
  	    		numChain[i] = Math.floor((Math.random() * 10));
  	    	}
  	    	//display number
			$scope.num1 = numChain[0];
			$scope.num2 = numChain[1];
			$scope.num3 = numChain[2];
			$scope.num4 = numChain[3];

       createRoutine();
			deepCopy(oldChain, numChain);
		};

    //initialize first
    if(playing)
		 init();

  });


