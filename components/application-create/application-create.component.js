angular.
module('applicationCreate').
component('applicationCreate', {
  templateUrl: 'components/application-create/application-create.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
  },
  controller: [function ApplicationCreateController() {
      let $ctrl = this;
      $ctrl.isEmployeeVisible = false;

      // close modal, return changes
      $ctrl.handleClose = function() {
        $ctrl.$close({
        //   result: $ctrl.employee
        });
      };

      // dismiss modal
      $ctrl.handleDismiss = function() {
        $ctrl.$dismiss({
          reason: 'cancelled'
        });
      };

    }
  ]
});
