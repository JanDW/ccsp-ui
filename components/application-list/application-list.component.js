angular.
	module('applicationList').
	component('applicationList', {
		templateUrl: 'components/application-list/application-list.template.html',
		controller: ['$http', '$window',
			function ApplicationListController($http, $window) {
				var $ctrl = this;

				$window.document.title = 'Application Inbox';

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('http://localhost:3000/applications?_expand=employee&statusCode=0&_sort=lastSubmissionDate&_order=desc').then(function(response){
					$ctrl.applications = response.data;
				});
			}
		]
	});
