angular.
module('employeeDetailEdit').
component('employeeDetailEdit', {
  templateUrl: 'components/employee-detail-edit/employee-detail-edit.template.html',
  bindings: {
    // $close: '&',
    // $dismiss: '&',
    employee: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [ function EmployeeDetailEditController() {
      let $ctrl = this;

      // self.handleClose = function() {
      //     console.info("in handle close");
      //     self.$close({
      //         result: self.modalData
      //     });
      // };
      // self.handleDismiss = function() {
      //     console.info("in handle dismiss");
      //     self.$dismiss({
      //         reason: 'cancel'
      //     });
      // };
    }
  ]
});
