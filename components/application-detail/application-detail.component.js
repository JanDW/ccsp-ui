/* jshint esversion:6 */
angular.
module('applicationDetail').
component('applicationDetail', {
  templateUrl: 'components/application-detail/application-detail.template.html',
  controller: [
    '$http',
    '$routeParams',
    function ApplicationDetailController($http, $routeParams) {
      var self = this;
      let childrenQueryParameter = '?';

      /* API CALLS */
      // Get application and embed the employee
      $http.
      get('http://localhost:3000/applications/' + $routeParams.applicationId + '?_expand=employee').
      then(function(response) {
        self.application = response.data;

        // Get the spouse
        $http.
        get('http://localhost:3000/spouses/' + self.application.employee.spouseId).
        then(function(response) {
          self.spouse = response.data;
        });

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
      /* http://jsfiddle.net/zeck/L8Snx/ */
      self.prev = function() {
        console.log('prev');
      };
      self.next = function() {
        console.log('next');
      };
    }
  ]
});
