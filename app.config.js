'use strict';
// $ROUTES
angular.module('ccspApp').config([
	'$locationProvider',
	'$routeProvider',
	function config($locationProvider, $routeProvider){
		$locationProvider.hashPrefix('!');

		$routeProvider.
			when('/applications-inbox', {
				template: '<application-list></application-list>'
			}).
			when('/applications-inbox/:applicationId', {
				template: '<application-detail></application-detail>'
			}).
      when('/applications', {
				template: '<application-list-all></application-list-all>'
			}).
      when('/applications/:applicationId', {
				template: '<application-detail></application-detail>'
			}).
			//when('/employees/:employeeId', {
			//	template: ''
			//})
			otherwise('/applications-inbox');
	}
]);
