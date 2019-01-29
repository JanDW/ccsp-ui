angular.module('employeeDetailEdit').component('employeeDetailEdit', {
  templateUrl:
    'components/employee-detail-edit/employee-detail-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [
    function EmployeeDetailEditController() {
      let $ctrl = this;

      // Update marital title based upon marital status
      $ctrl.updateSpouseMaritalTitle = function() {
        if ($ctrl.employee.maritalStatus === 'married') {
          $ctrl.employee.spouseMaritalTitle = 'spouse';
        } else if ($ctrl.employee.maritalStatus === 'partnership') {
          $ctrl.employee.spouseMaritalTitle = 'partner';
        } else if ($ctrl.employee.maritalStatus === 'divorced') {
          $ctrl.employee.spouseMaritalTitle = 'ex-spouse';
        }
      };
      // close modal, return changes
      $ctrl.handleClose = function() {
        $ctrl.$close({
          result: $ctrl.employee,
        });
      };

      // dismiss modal
      $ctrl.handleDismiss = function() {
        $ctrl.$dismiss({
          reason: 'cancelled',
        });
      };
    },
  ],
});
