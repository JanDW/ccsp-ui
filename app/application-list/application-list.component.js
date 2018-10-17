angular.
	module('applicationList').
	component('applicationList', {
		templateUrl: 'application-list/application-list.template.html',
		controller: ['$http',
			function ApplicationListController($http) {
				var self = this;
				// self.orderProp = 'age';

				$http.get('http://localhost:3000/applications?_expand=employee').then(function(response){
					self.applications = response.data;
				});
			}
		]
	});
