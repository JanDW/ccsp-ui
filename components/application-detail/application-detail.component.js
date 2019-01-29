angular.module('applicationDetail').component('applicationDetail', {
  templateUrl: 'components/application-detail/application-detail.template.html',
  controller: [
    '$scope',
    '$http',
    '$routeParams',
    '$location',
    '$window',
    '$uibModal',
    function ApplicationDetailController(
      $scope,
      $http,
      $routeParams,
      $location,
      $window,
      $uibModal
    ) {
      var $ctrl = this;
      let childrenQueryParameter = '?';

      /* API CALLS */
      // Get application and embed the employee
      $http
        .get(
          'https://ccsp-api.herokuapp.com/applications/' +
            $routeParams.applicationId +
            '?_expand=employee&_embed=awards'
        )
        .then(function(response) {
          $ctrl.application = response.data;

          // Set page <title>
          $window.document.title =
            'Application for ' +
            $ctrl.application.employee.lastName +
            ', ' +
            $ctrl.application.employee.firstName +
            ' ' +
            ($ctrl.application.employee.middleInitial || '') +
            ' – MIT Childcare Center Scholarship';

          // putting CSS classes in a controller is not the best idea
          // this is a prototype
          switch ($ctrl.application.statusCode) {
            case 0:
              $ctrl.application.badgeClass = 'badge-primary';
              break;
            case 1:
              $ctrl.application.badgeClass = 'badge-info';
              break;
            case 2:
              $ctrl.application.badgeClass = 'badge-warning';
              break;
            case 3:
              $ctrl.application.badgeClass = 'badge-danger';
              break;
            case 4:
              $ctrl.application.badgeClass = 'badge-success';
              break;
            case 5:
              $ctrl.application.badgeClass = 'badge-danger';
              break;
            default:
              console.log("Wasn't able to select a badge based on statusCode");
          }

          // Create date objects for award dates
          $ctrl.application.awards.forEach(function(award) {
            award._startDate = new Date(award.startDate);
            award._endDate = new Date(award.endDate);
          });

          $ctrl.application.employee.salaryHistory.forEach(function(salary) {
            salary._startDate = new Date(salary.startDate);
          });

          // Get the spouse
          if (typeof $ctrl.application.employee.spouseId !== 'undefined') {
            $http
              .get(
                'https://ccsp-api.herokuapp.com/spouses/' +
                  $ctrl.application.employee.spouseId
              )
              .then(function(response) {
                $ctrl.spouse = response.data;
              });
          }

          // Get the children (construct query parameter for API first)
          $ctrl.application.employee.childIds.forEach(function(childId) {
            childrenQueryParameter += 'id=' + childId + '&';
          });

          $http
            .get(
              'https://ccsp-api.herokuapp.com/children/' +
                childrenQueryParameter
            )
            .then(function(response) {
              $ctrl.children = response.data;
            });
        });

      // Get TCC tuition costs
      $http
        .get('https://ccsp-api.herokuapp.com/tccTuition/')
        .then(function(response) {
          $ctrl.tccTuition = response.data;
        });

      $ctrl.isAwardChanged = false;

      $scope.$watch('$ctrl.application.monthlyAwardLimited', function(
        newValue,
        oldValue,
        scope
      ) {
        if (newValue !== oldValue) {
          $ctrl.isAwardChanged = true;
        }
      });

      /* METHODS */

      // Review Award handler
      $ctrl.reviewAward = function() {
        $uibModal
          .open({
            template:
              '<award-detail-add  application="$ctrl.application" $close="$close(result)" $dismiss="$dismiss(reason)"></award-detail-add>',
            controller: [
              'application',
              function(application) {
                let $ctrl = this;
                $ctrl.application = application;
              },
            ],
            controllerAs: '$ctrl',
            resolve: {
              application: function() {
                return angular.copy($ctrl.application);
              },
            },
          })
          .result.then(
            function(result) {
              // modal saved - update $ctrl.employee $ctrl.spouse with returned object
              console.info('saved ->' + result);
              $ctrl.application = result.application;

              // modal dismissed
            },
            function(reason) {
              console.info('dismissed ->' + reason);
            }
          );
      };

      $ctrl.isApplicationsInbox = function() {
        return /inbox/.test(window.location.hash);
      };

      // Navigate to previous 'pending approval' application
      $ctrl.prev = function() {
        // only decrease when not first in array
        const previousOrderIndex =
          $ctrl.application.orderIndex > 0
            ? $ctrl.application.orderIndex - 1
            : 0;
        // request id match to previousOrderIndex and go there
        $http
          .get(
            'https://ccsp-api.herokuapp.com/applications?orderIndex=' +
              previousOrderIndex
          )
          .then(function(response) {
            $location.path('applications-inbox/' + response.data[0].id);
          });
      };

      // Navigate to next 'pending approval' application
      $ctrl.next = function() {
        $http
          .get('https://ccsp-api.herokuapp.com/applications?statusCode=0')
          .then(function(response) {
            const nextOrderIndex = $ctrl.application.orderIndex + 1;
            // request id match to nextOrderIndex and go there
            $http
              .get(
                'https://ccsp-api.herokuapp.com/applications?orderIndex=' +
                  nextOrderIndex
              )
              .then(function(response) {
                $location.path('applications-inbox/' + response.data[0].id);
              });
          });
      };
    },
  ],
});
