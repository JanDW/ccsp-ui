'use strict';
// $ROUTES
angular.module('ccspApp').config([
	'$locationProvider',
	'$routeProvider',
	function config($locationProvider, $routeProvider){
		$locationProvider.hashPrefix('!');

		$routeProvider.
			when('/applications', {
				template: '<application-list></application-list>'
			}).
			when('/applications/:applicationId', {
				template: '<application-detail></application-detail>'
			}).
			//when('/employees/:employeeId', {
			//	template: ''
			//})
			otherwise('/applications');
	}
]);
