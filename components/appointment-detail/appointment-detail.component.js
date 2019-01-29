angular.module('appointmentDetail').component('appointmentDetail', {
  templateUrl: 'components/appointment-detail/appointment-detail.template.html',
  bindings: {
    employee: '=', //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [
    '$uibModal',
    function AppointmentDetailController($uibModal) {
      $ctrl = this;

      $ctrl.isAppointmentsCollapsed = true;

      //   $ctrl.editEmployee = function(){
      //    $uibModal.open({
      //     template: '<appointment-detail-edit employee="$ctrl.employee" $close="$close(result)" $dismiss="$dismiss(reason)"></appointment-detail-edit>',
      //     controller: ['employee', function(employee) {
      //       let $ctrl = this;
      //       $ctrl.employee = employee;
      //     }],
      //     controllerAs: '$ctrl',
      //     resolve: {
      //       employee: function(){
      //        return angular.copy($ctrl.employee); //return a copy so changes don't get pushed up
      //       }
      //     }
      //   }).result.then(function(result){
      //     // modal saved - update $ctrl.employee with returned object
      //     console.info("saved ->"+ result);
      //     $ctrl.employee = result;
      //     // modal dismissed
      //   }, function(reason) {
      //     console.info("dismissed ->"+ reason);
      //   });
      // };
    },
  ],
});
