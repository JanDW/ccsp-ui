angular.module('childrenListEdit').component('childrenListEdit', {
  templateUrl: 'components/children-list-edit/children-list-edit.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    children: '=', //data gets passed in as an input on a children attribute on the custom element
  },
  controller: [
    function ChildrenListEditController() {
      let $ctrl = this;

      $ctrl.$onChanges = function(changes) {
        // Make sure the data is available:
        // Check objects are there.
        // Note: $onChanges works for one-way databinding only
        // @TODO There has to be a better solution that this kludgy mess
        if (typeof $ctrl.children === 'object') {
          // Create date objects for children-list-edit
          angular.forEach($ctrl.children, function(child) {
            child._dateOfBirth = new Date(child.dateOfBirth);
          });
        }
      };

      $ctrl.addChild = function() {
        // add a new object to the children array
        $ctrl.children.push({});
      };

      $ctrl.handleClose = function() {
        // Copy over the date of birth to the original property
        angular.forEach($ctrl.children, function(child) {
          child.dateOfBirth = child._dateOfBirth;
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
