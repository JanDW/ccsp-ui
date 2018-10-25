angular.
module('applicationDetail').
component('applicationDetail', {
  templateUrl: 'components/application-detail/application-detail.template.html',
  controller: [
    '$http',
    '$routeParams',
    '$location',
    function ApplicationDetailController($http, $routeParams, $location) {
      var self = this;
      let childrenQueryParameter = '?';

      /* API CALLS */
      // Get application and embed the employee
      $http.
      get('http://localhost:3000/applications/' + $routeParams.applicationId + '?_expand=employee').
      then(function(response) {
        self.application = response.data;

        switch (self.application.statusCode) {
          case 0:
              self.application.badgeClass = 'badge-primary';
            break;
          case 1:
              self.application.badgeClass = 'badge-info';
            break;
          case 2:
              self.application.badgeClass ='badge-warning';
            break;
          case 3:
              self.application.badgeClass ='badge-danger';
            break;
          case 4:
              self.application.badgeClass = 'badge-success';
            break;
          case 5:
              self.application.badgeClass = 'badge-danger';
            break;
          default:
            console.log('Wasn\'t able to select a badge based on statusCode');
        }



        // Get the spouse
        if (typeof self.application.employee.spouseId !== 'undefined') {
          $http.
          get('http://localhost:3000/spouses/' + self.application.employee.spouseId).
          then(function(response) {
            self.spouse = response.data;
          });
        }


        // Get the children (construct query parameter for API first)
        self.application.employee.childIds.forEach(function(childId){
          childrenQueryParameter += 'id=' + childId + '&';
        });

        $http.
        get('http://localhost:3000/children/' + childrenQueryParameter ).
        then(function(response) {
          self.children = response.data;
        });
      });


      /* METHODS */

      // Navigate to previous 'pending approval' application
      self.prev = function() {
        // only decrease when not first in array
        const previousOrderIndex = self.application.orderIndex > 0 ? self.application.orderIndex - 1 : 0;
        // request id match to previousOrderIndex and go there
        $http.
        get('http://localhost:3000/applications?orderIndex=' + previousOrderIndex).
        then(function(response){
          $location.path('applications/' + response.data[0].id);
        });


      };

      // Navigate to next 'pending approval' application
      self.next = function() {
        $http.
          get('http://localhost:3000/applications?statusCode=0').
          then(function(response){
            // only increase when not last in array
            const totalApplicationsPendingApproval = response.data.length;
            const nextOrderIndex = (self.application.orderIndex + 1  < totalApplicationsPendingApproval ) ?
              self.application.orderIndex + 1 :
              self.application.orderIndex;
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
