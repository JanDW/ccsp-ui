angular.
module('applicationDetail').
component('applicationDetail', {
  templateUrl: 'components/application-detail/application-detail.template.html',
  controller: [
    '$scope',
    '$http',
    '$routeParams',
    '$location',
    '$window',
    function ApplicationDetailController($scope, $http, $routeParams, $location, $window) {
      var $ctrl = this;
      let childrenQueryParameter = '?';

      /* API CALLS */
      // Get application and embed the employee
      $http.
      get('http://localhost:3000/applications/' + $routeParams.applicationId + '?_expand=employee').
      then(function(response) {
        $ctrl.application = response.data;

        // Set page <title>
        $window.document.title = 'Application for ' + $ctrl.application.employee.lastName + ', ' + $ctrl.application.employee.firstName + ' ' +
        ($ctrl.application.employee.middleInitial || '') + ' – MIT Childcare Center Scholarship';

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
              $ctrl.application.badgeClass ='badge-warning';
            break;
          case 3:
              $ctrl.application.badgeClass ='badge-danger';
            break;
          case 4:
              $ctrl.application.badgeClass = 'badge-success';
            break;
          case 5:
              $ctrl.application.badgeClass = 'badge-danger';
            break;
          default:
            console.log('Wasn\'t able to select a badge based on statusCode');
        }



        // Get the spouse
        if (typeof $ctrl.application.employee.spouseId !== 'undefined') {
          $http.
          get('http://localhost:3000/spouses/' + $ctrl.application.employee.spouseId).
          then(function(response) {
            $ctrl.spouse = response.data;
          });
        }


        // Get the children (construct query parameter for API first)
        $ctrl.application.employee.childIds.forEach(function(childId){
          childrenQueryParameter += 'id=' + childId + '&';
        });

        $http.
        get('http://localhost:3000/children/' + childrenQueryParameter ).
        then(function(response) {
          $ctrl.children = response.data;
        });
      });

      // Get TCC tuition costs
      $http.
      get('http://localhost:3000/tccTuition/').
      then(function(response) {
        $ctrl.tccTuition = response.data;
      });

      $ctrl.isAwardChanged = false;

      $scope.$watch('$ctrl.application.monthlyAwardLimited', function(newValue, oldValue, scope){
        if (newValue !== oldValue) {
          $ctrl.isAwardChanged = true;
        }
      });

      /* METHODS */

      // Navigate to previous 'pending approval' application
      $ctrl.prev = function() {
        // only decrease when not first in array
        const previousOrderIndex = $ctrl.application.orderIndex > 0 ? $ctrl.application.orderIndex - 1 : 0;
        // request id match to previousOrderIndex and go there
        $http.
        get('http://localhost:3000/applications?orderIndex=' + previousOrderIndex).
        then(function(response){
          $location.path('applications/' + response.data[0].id);
        });
      };

      // Navigate to next 'pending approval' application
      $ctrl.next = function() {
        $http.
          get('http://localhost:3000/applications?statusCode=0').
          then(function(response){
            const nextOrderIndex = $ctrl.application.orderIndex + 1;
            // request id match to nextOrderIndex and go there
            $http.
              get('http://localhost:3000/applications?orderIndex=' + nextOrderIndex).
              then(function(response){
                $location.path('applications/' + response.data[0].id);
            });
          });
      };
    }
  ]
});
