(function() {

	'use strict';

	angular
		.module('formlyApp')
		.controller('MainController', MainController);

		function MainController($scope, $http, $rootScope) {
			var vm = this;
			var confData = {};

			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.rentalFields = [
				{
					key: 'first_name',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'Name',
						placeholder: 'Enter your name',
						required: true
					}
				},
				{
					key: 'email',
					type: 'input',
					templateOptions: {
						type: 'email',
						label: 'Email address',
						placeholder: 'Enter email',
						required: true
					}
				}
			];

			$scope.$on('config-loaded', function(){
    			$scope.colors = $rootScope.config.config.colors;  
			    $scope.labels = $rootScope.config.config.labels;
			    $scope.labelColors = $rootScope.config.config.labelColors;
			    $scope.labelIcons = $rootScope.config.config.labelIcons;
			    $scope.eventInfo = $rootScope.config.config.eventInfo;
  			});

			//$scope.colors || ($scope.colors = ["#da355a", "#5da44d", "#ef7b54", "#4284a6", "#f1bd62", "#7d5aa2"]);
    		//$scope.labels = ["section 1", "section 2", "section 3", "section 4", "section 5", "section 6"];
		    //$scope.labelColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
		    //$scope.labelIcons = ["images/benafro.png", "images/cog.png", "images/abc.png", "images/envelop.png", "images/group.png", "images/wrench.png"];
		    //$scope.eventInfo = "Turn the wheel or click on a section to see the event displayed here";


		    $scope.$on("roulette:turned", function(e, info) {
		      return $scope.$apply(function() {
		        return $scope.eventInfo = "Event: roulette:turned - Params: " + (JSON.stringify(info));
		      });
		    });
		    return $scope.$on("roulette:select", function(e, info) {
		      return $scope.$apply(function() {
		        return $scope.eventInfo = "Event: roulette:select - Params: " + (JSON.stringify(info));
		      });
		    });

		}

})();