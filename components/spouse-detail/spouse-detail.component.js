/* jshint esversion:6 */
angular.
module('spouseDetail').
component('spouseDetail', {
  templateUrl: 'components/spouse-detail/spouse-detail.template.html',
  bindings: {
    employee: '=', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '='
  },
  controller: ['$uibModal',
    function SpouseDetailController($uibModal) {
      var $ctrl = this;

      $ctrl.isOccupationCollapsed = true;

      $ctrl.editSpouse = function(){
       $uibModal.open({
        template: '<spouse-detail-edit employee="$ctrl.employee" spouse="$ctrl.spouse" $close="$close(result)" $dismiss="$dismiss(reason)"></spouse-detail-edit>',
        controller: ['employee','spouse', function(employee, spouse) {
          let $ctrl = this;
          $ctrl.employee = employee;
          $ctrl.spouse = spouse;
        }],
        controllerAs: '$ctrl',
        resolve: {
          employee: function(){
           return angular.copy($ctrl.employee);
           },
          spouse: function(){
            return angular.copy($ctrl.spouse);
          }
        }
      }).result.then(function(result){
        // modal saved - update $ctrl.employee $ctrl.spouse with returned object
        console.info("saved ->"+ result);
        $ctrl.employee = result.employee;
        $ctrl.spouse = result.spouse;

        // modal dismissed
      }, function(reason) {
        console.info("dismissed ->"+ reason);
      });
    };
  }]
});
