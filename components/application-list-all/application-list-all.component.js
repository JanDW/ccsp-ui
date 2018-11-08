angular.
	module('applicationListAll').
	component('applicationListAll', {
		templateUrl: 'components/application-list/application-list.template.html',
		controller: ['$http', '$window',
			function ApplicationListAllController($http, $window) {
				var $ctrl = this;

				$window.document.title = 'All Applications | MIT Childcare Center Scholarship';

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('http://localhost:3000/applications?_expand=employee&_sort=lastSubmissionDate&_order=desc').then(function(response){
					$ctrl.applications = response.data;
				});
			}
		]
	});
