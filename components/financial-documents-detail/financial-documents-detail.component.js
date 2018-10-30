/* jshint esversion:6 */
angular.
module('financialDocumentsDetail').
component('financialDocumentsDetail', {
  templateUrl: 'components/financial-documents-detail/financial-documents-detail.template.html',
  bindings: {
    employee: '=', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '='
  },
  controller: ['$uibModal',
    function FinancialDocumentsDetailController($uibModal) {
      var $ctrl = this;

      $ctrl.editFinancialDocuments = function(){
       $uibModal.open({
        template: '<financial-documents-detail-edit employee="$ctrl.employee" spouse="$ctrl.spouse" $close="$close(result)" $dismiss="$dismiss(reason)"></financial-documents-detail-edit>',
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
