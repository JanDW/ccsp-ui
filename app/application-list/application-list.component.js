angular.
	module('applicationList').
	component('applicationList', {
		templateUrl: 'application-list/application-list.template.html',
		controller: ['$http',
			function ApplicationListController($http) {
				var self = this;
				self.orderProp = 'age';

				$http.get('people.json').then(function(response){
					self.employees = response.data;
				});
			}
		]
	});
