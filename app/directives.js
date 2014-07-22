(function(angular) {
	"use strict";

	var app = angular.module("add1App");

	app.directive("numberGenerator", function($interval) {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				changeNum: '&', 
				num: '='
			},
			templateUrl: 'templates/number-generator.html',
			link: function(scope, element, attributes) {

				var changer;

				var destroyChanger = function() {
                    if(changer) {
                        //Cancel rotator
                        $interval.cancel(changer);
                        //Destroy rotator
                        changer = undefined;
                    }
                };

				var changeNum = function(){

					if(changer)
						return;

					changer = $interval(function() {
					scope.num = Math.floor((Math.random() * 10000));
					}, 3000);
				};

				scope.$on('$destroy', function() {
					destroyChanger();
				});


			}
		};
	});
})(window.angular)