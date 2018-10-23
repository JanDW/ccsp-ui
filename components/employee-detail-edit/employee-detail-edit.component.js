angular.
module('employeeDetailEdit').
component('employeeDetailEdit', {
  templateUrl: 'components/employee-detail-edit/employee-detail-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    employee: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [ function EmployeeDetailEditController() {
      let $ctrl = this;

      $ctrl.handleClose = function() {
        $ctrl.$close({
          result: $ctrl.employee
        });
      };

      $ctrl.handleDismiss = function() {
        $ctrl.$dismiss({
          reason: 'cancelled'
        });
      };

    }
  ]
});
