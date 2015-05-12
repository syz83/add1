'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the halloffame.html
 */

angular.module('add1App').filter('orderObjectBy', function() {
return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  	};
  })
  .controller('HallCtrl', function ($scope, scoreBoard) {
  	$scope.scoreboard = scoreBoard.query();
  });
