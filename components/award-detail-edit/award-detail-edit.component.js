angular.module('awardDetailEdit').component('awardDetailEdit', {
  templateUrl: 'components/award-detail-edit/award-detail-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    award: '=', //data gets passed in as an input on an award attribute on the custom element
  },
  controller: [
    function AwardDetailEditController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {};

      $ctrl.handleClose = function() {
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
