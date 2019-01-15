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

      angular.element(document).find('#newApplication').on('click', function() {
    		if ( /^github/.test(window.location.hostname) ) {
    			location.replace('https://github.mit.edu/pages/jandw/ccsp-experiment/to-sort/new-application.html?user=johndoe');
    		} else {
    			location.replace('http://localhost:8000/to-sort/new-application.html?user=johndoe');
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
          reason: 'cancelled'
        });
      };

    }
  ]
});
