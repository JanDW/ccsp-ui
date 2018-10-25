angular.
module('spouseDetailEdit').
component('spouseDetailEdit', {
  templateUrl: 'components/spouse-detail-edit/spouse-detail-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    spouse: '<', //data gets passed in as an input on an spouse attribute on the custom element
    employee: '<'
  },
  controller: [ function SpouseDetailEditController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {
        // Checkbox for toggeling mitid
        if (typeof $ctrl.spouse === 'object') {
          if ($ctrl.spouse.mitId) {
            $ctrl.spouse.isMitIdPresent = true;
          } else {
            $ctrl.spouse.isMitIdPresent = false;
          }

          // angular requires date objects
          if ($ctrl.spouse.appointmentStartDate) {
            $ctrl.spouse._appointmentStartDate = new Date($ctrl.spouse.appointmentStartDate);
          }
          if ($ctrl.spouse.appointmentEndDate) {
            $ctrl.spouse._appointmentEndDate = new Date($ctrl.spouse.appointmentEndDate);
          }
          if ($ctrl.spouse.selfEmploymentStartDate) {
            $ctrl.spouse._selfEmploymentStartDate = new Date($ctrl.spouse.selfEmploymentStartDate);
          }
          if ($ctrl.spouse.schoolAdmissionDate) {
            $ctrl.spouse._schoolAdmissionDate = new Date($ctrl.spouse.schoolAdmissionDate);
          }
          if ($ctrl.spouse.schoolExpectedGraduationDate) {
            $ctrl.spouse._schoolExpectedGraduationDate = new Date($ctrl.spouse.schoolExpectedGraduationDate);
          }
        }
      };

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
