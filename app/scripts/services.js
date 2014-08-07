(function(angular) {
    "use strict";

    var app = angular.module('add1App');

    app.factory('RankService', function($resource){

    	return $resource('/api/ranks');

    });

    app.factory('BoardService', function(RankService){
    	var ranks = RankService.query();
    	var getRankbyPlace = function(placeVal){
    		return ranks.get({place:placeVal});
    	};
    	//replace rank1 with rank2
    	var replaceRank = function(rank1, rank2){
    		rank1.place = rank2.place;
    		rank1.highscore = rank2.highscore;
    		rank1.name = rank2.name;
    	};
    	var copyRank = function(copy, rank){
    		copy.place = rank.place;
    		copy.highscore = rank.highscore;
    		copy.name = rank.name;
    	};
    	var shiftRanks = function(newRank, position){
    		var temp = {};
			for(var i=position; i<=10; i++){
				copyRank(temp, getRankbyPlace(i+1));
				replaceRank(getRankbyPlace(i+1), getRankbyPlace(i));
			}
		};
    	return {
    		insertRank: function(newRank){
    			if(newRank.highscore > lowestRank().highscore){
    				for(var i = 1; i<=10; i++){
    					if(newRank.highscore > ranks.get({place:i}).highscore){
    						shiftRanks(newRank, i);
    					}
    				}
    			}
    			else{
    				return false;
    			}
    		},
    		lowestRank: function(){
    			return ranks.get({place:10});
    		}

    	};
    });

})(window.angular);