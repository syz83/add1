(function(angular) {
    "use strict";

    var app = angular.module('add1App');

    app.factory('scoreBoard', function($resource){

    	// return $resource('/api/scores/:_id',
     //        {_id:'@_id'});
    return $resource('/api/scores/:_id', {_id:'@_id'});

    });

})(window.angular);