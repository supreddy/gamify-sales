(function() {

	'use strict';

	var app = angular.module('formlyApp', ['formly', 'formlyBootstrap', 'roulette', 'ngRoute'])
	.config(function($routeProvider) {
	    return $routeProvider.when("/", {
	      templateUrl: "index.html",
	      controller: "MainController"
	    }).otherwise({
	      redirectTo: "/"
	    });
  	});

  	app.run(function($http, $rootScope){
	  $http.get('config.json')
	  .success(function(data, status, headers, config) {
	    $rootScope.config = data;
	    $rootScope.$broadcast('config-loaded');
	  })
	  .error(function(data, status, headers, config) {
	    // log error
	    alert('error');
	  });
	});

})();