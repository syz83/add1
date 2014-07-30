'use strict';

/**
 * @ngdoc overview
 * @name add1App
 * @description
 * # add1App
 *
 * Main module of the application.
 */
angular
  .module('add1App', [
    'ui.router',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('donate', {
                url: '/donate',
                templateUrl: 'views/donate.html'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            });
});