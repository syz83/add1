'use strict';

/**
 * @ngdoc function
 * @name add1App.controller:HallCtrl
 * @description
 * # HallCtrl
 * Controller of the halloffame.html
 */
angular.module('add1App')
  .controller('HallCtrl', function ($scope, RankService, BoardService) {
  	$scope.leaderboard = RankService.query();
  });
