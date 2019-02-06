angular.module('awardCreate').component('awardCreate', {
  templateUrl: 'components/award-create/award-create.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    application: '=', //data gets passed in as an input on an application attribute on the custom element
  },
  controller: [
    function AwardCreateController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {
        $ctrl.newAwardStartDate =
          $ctrl.application.employee.salaryHistory[0]._startDate;
        $ctrl.newAwardEndDate = new Date('08/31/2019');
      };

      // Create new award on close
      $ctrl.handleClose = function() {
        $ctrl.application.awards.push({
          id: $ctrl.application.awards.length + 1,
          startDate: $ctrl.newAwardStartDate.toISOString(),
          endDate: $ctrl.newAwardEndDate.toISOString(),
          _startDate: $ctrl.newAwardStartDate,
          _endDate: $ctrl.newAwardEndDate,
          amount: null,
          applicationId: $ctrl.application.id,
          status: 'draft',
        });
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
