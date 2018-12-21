angular.
	module('applicationList').
	component('applicationList', {
		templateUrl: 'components/application-list/application-list.template.html',
		controller: ['$http', '$window', 'DTOptionsBuilder', 'DTColumnDefBuilder',
			function ApplicationListController($http, $window, DTOptionsBuilder, DTColumnDefBuilder) {
				var $ctrl = this;

				$window.document.title = 'Application Inbox';

        $ctrl.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(100);

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('https://ccsp-api.herokuapp.com/applications?_expand=employee&statusCode=0&_sort=lastSubmissionDate&_order=desc').then(function(response){
					$ctrl.applications = response.data;
				});
			}
		]
	});
