angular.model('core.employee').
	factory('Employee', ['$resource',
		function($resource) {
			return $resource('employees/:employeeId.json', {}, {
				query: {
					method: 'GET',
					params: {personId: 'employees'},
					isArray: true
				}
			});
		}
]);
