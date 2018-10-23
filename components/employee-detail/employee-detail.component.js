/* jshint esversion:6 */
angular.
module('employeeDetail').
component('employeeDetail', {
  templateUrl: 'components/employee-detail/employee-detail.template.html',
  bindings: {
    employee: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: ['$uibModal',
    function EmployeeDetailController($uibModal) {
      $ctrl = this;
      console.log($ctrl);

      $ctrl.editEmployee = function(){
       $uibModal.open({
        template: '<employee-detail-edit employee="$ctrl.employee"></employee-detail-edit>',
        controller: ['employee', function(employee) {
          let $ctrl = this;
          $ctrl.employee = employee;
          //$ctrl.employee = employee;
        }],
        controllerAs: '$ctrl',
        resolve: {
          employee: function(){
           return  $ctrl.employee;
          }
        }
      });
    };
  }]
});
