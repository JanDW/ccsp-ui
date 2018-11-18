angular.
module('childrenListEdit').
component('childrenListEdit', {
  templateUrl: 'components/children-list-edit/children-list-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    children: '=', //data gets passed in as an input on a children attribute on the custom element
  },
  controller: [ function ChildrenListEditController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {

      };

      $ctrl.addChild = function() {
        // add a new object to the children array
        $ctrl.children.push({});
      };

      $ctrl.handleClose = function() {

        // Copy over the date of birth to the original property
        angular.forEach($ctrl.children, function(child){
          child.dateOfBirth = child._dateOfBirth;
        });

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
