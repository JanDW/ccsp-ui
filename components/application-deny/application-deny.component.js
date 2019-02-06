angular.module('applicationDeny').component('applicationDeny', {
  templateUrl: 'components/application-deny/application-deny.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    application: '=', //data gets passed in as an input on an application attribute on the custom element
  },
  controller: [
    function ApplicationDenyController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {};

      // Create new award on close
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
