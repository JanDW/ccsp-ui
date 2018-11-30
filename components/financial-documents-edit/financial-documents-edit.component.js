angular.
module('financialDocumentsEdit').
component('financialDocumentsEdit', {
  templateUrl: 'components/financial-documents-edit/financial-documents-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    documents: '=' //data gets passed in as an input on an spouse attribute on the custom element
  },
  controller: [ function SpouseDetailEditController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {
        // Checkbox for toggeling mitid

      };

      $ctrl.documentTypeSelection = null;

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
