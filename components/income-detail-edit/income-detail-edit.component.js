angular.
module('incomeDetailEdit').
component('incomeDetailEdit', {
  templateUrl: 'components/income-detail-edit/income-detail-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    employee: '<', //data gets passed in as an input on an employee and spouse attributes on the custom element
    spouse: '<',
  },
  controller: [ function IncomeDetailEditController() {
      let $ctrl = this;

      // $ctrl.$onChanges = function(changes) {
      //   console.table($ctrl);
      // };

      $ctrl.handleClose = function() {
        $ctrl.$close({
          result: $ctrl
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
