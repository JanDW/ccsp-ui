angular.
	module('applicationList').
	component('applicationList', {
		templateUrl: 'components/application-list/application-list.template.html',
		controller: ['$http',
			function ApplicationListController($http) {
				var self = this;

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('http://localhost:3000/applications?_expand=employee&statusCode=0').then(function(response){
					self.applications = response.data;
				});
			}
		]
	});
