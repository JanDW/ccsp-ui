'use strict';

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
			otherwise('/applications');
	}
]);
