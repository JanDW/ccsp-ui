angular.
	module('applicationListAll').
	component('applicationListAll', {
		templateUrl: 'components/application-list-all/application-list-all.template.html',
		controller: ['$http', '$window', '$timeout', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$uibModal',
			function ApplicationListAllController($http, $window, $timeout, DTOptionsBuilder, DTColumnDefBuilder, $uibModal) {
				var $ctrl = this;

        //Insert this filter after datatables has rendered the table
        var filterTimeTemplate = `
          <label class="col-4">
            <span>Show</span>
            <select class="custom-select" id="applicationsTable_timeFilter">
             <option value="test">Current month</option>
             <option value="test">2018-2019</option>
             <option value="test">2017-2018</option>
             <option value="test">All history</option>
            </select>
          </label>
        `;

				$window.document.title = 'All Applications | MIT Childcare Center Scholarship';

        $ctrl.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(100);

				// Get all applications with statusCode 0 corresponds to (statusMessage:'Pending approval')
				$http.get('http://localhost:3000/applications?_expand=employee&_embed=awards&_sort=lastSubmissionDate&_order=desc').then(function(response){
					$ctrl.applications = response.data;

          // DOM has finished rendering, time for some ugly shit
          $timeout(function () {
            angular.element(document).find('#applicationsTable_filter').after(filterTimeTemplate);
            angular.element(document).find('.container[ng-view]').addClass('applications-container');
          }, 250);


          $ctrl.applicationTimeFilter = [''];

          $ctrl.createApplication = function(){
           $uibModal.open({
            template: '<application-create $close="$close(result)" $dismiss="$dismiss(reason)"></application-create>',
            controller: [function() {
              let $ctrl = this;
            }],
            controllerAs: '$ctrl',
            resolve: {
            }
          }).result.then(function(result){
            // modal saved - update $ctrl.employee with returned object
            console.info("saved ->"+ result);
            $ctrl.employee = result;
            // modal dismissed
          }, function(reason) {
            console.info("dismissed ->"+ reason);
          });
        };



          // $ctrl.randomStatusActive = () => {
          //   if (Math.random() < 0.15) {
          //     return 'status-cell-active';
          //   }
          // };

          angular.forEach($ctrl.applications, function(application){
            switch (application.statusCode) {
              case 0:
                  application.badgeClass = 'badge-primary';
                  application.textClass = 'text-primary';
                break;
              case 1:
                  application.badgeClass = 'badge-info';
                  application.textClass = 'text-info';
                break;
              case 2:
                  application.badgeClass ='badge-warning';
                  application.textClass = 'text-warning';
                break;
              case 3:
                  application.badgeClass ='badge-danger';
                  application.textClass = 'text-danger';
                break;
              case 4:
                  application.badgeClass = 'badge-success';
                  application.textClass = 'text-success';
                break;
              case 5:
                  application.badgeClass = 'badge-danger';
                  application.textClass = 'text-danger';
                break;
              default:
                console.log('Wasn\'t able to select a badge based on statusCode');
            }

            // @TODO get awards

          });
				});
			}
		]
	});
