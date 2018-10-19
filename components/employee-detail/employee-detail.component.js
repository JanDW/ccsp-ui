/* jshint esversion:6 */
angular.
module('employeeDetail').
component('employeeDetail', {
  templateUrl: 'components/employee-detail/employee-detail.template.html',
  bindings: {
    employee: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [
    function EmployeeDetailController() {
      var self = this;
    }
  ]
});
