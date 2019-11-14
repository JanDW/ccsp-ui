angular.module('applicationCreate').component('applicationCreate', {
  templateUrl: 'components/application-create/application-create.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
  },
  controller: [
    function ApplicationCreateController() {
      let $ctrl = this;
      $ctrl.isEmployeeVisible = false;

      angular
        .element(document)
        .find('#newApplication')
        .on('click', function() {
          if (/^localhost/.test(window.location.hostname)) {
            location.replace(
              'http://localhost:8000/employee-ui/new-application.html?user=johndoe'
            );
          } else {
            location.replace(
              'https://jandw.github.io/ccsp-ui/employee-ui/new-application.html?user=johndoe'
            );
          }
        });

      // close modal, return changes
      $ctrl.handleClose = function() {
        $ctrl.$close({
          //   result: $ctrl.employee
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
