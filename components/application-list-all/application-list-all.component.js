angular.
	module('applicationListAll').
	component('applicationListAll', {
		templateUrl: 'components/application-list-all/application-list-all.template.html',
		controller: ['$http', '$window',
			function ApplicationListAllController($http, $window) {
				var $ctrl = this;

				$window.document.title = 'All Applications | MIT Childcare Center Scholarship';

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('http://localhost:3000/applications?_expand=employee&_sort=lastSubmissionDate&_order=desc').then(function(response){
					$ctrl.applications = response.data;

          angular.forEach($ctrl.applications, function(application){
            switch (application.statusCode) {
              case 0:
                  application.badgeClass = 'badge-primary';
                break;
              case 1:
                  application.badgeClass = 'badge-info';
                break;
              case 2:
                  application.badgeClass ='badge-warning';
                break;
              case 3:
                  application.badgeClass ='badge-danger';
                break;
              case 4:
                  application.badgeClass = 'badge-success';
                break;
              case 5:
                  application.badgeClass = 'badge-danger';
                break;
              default:
                console.log('Wasn\'t able to select a badge based on statusCode');
            }
          });
				});
			}
		]
	});
