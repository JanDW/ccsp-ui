angular.module('applicationReturn').component('applicationReturn', {
  templateUrl: 'components/application-return/application-return.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    application: '=', //data gets passed in as an input on an application attribute on the custom element
  },
  controller: [
    function ApplicationReturnController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {};

      // Create new award on close
      $ctrl.handleClose = function() {
        // $ctrl.application.awards.push({
        //   id: $ctrl.application.awards.length + 1,
        //   startDate: $ctrl.newAwardStartDate.toISOString(),
        //   endDate: $ctrl.newAwardEndDate.toISOString(),
        //   _startDate: $ctrl.newAwardStartDate,
        //   _endDate: $ctrl.newAwardEndDate,
        //   amount: null,
        //   applicationId: $ctrl.application.id,
        //   status: 'draft',
        // });
        $ctrl.$close({
          result: $ctrl,
        });
      };

      $ctrl.handleDismiss = function() {
        $ctrl.$dismiss({
          reason: 'cancelled',
        });
      };
    },
  ],
});
