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
      $ctrl.documents = {};

      $ctrl.editFinancialDocuments = function(){
       $uibModal.open({
        template: '<financial-documents-edit documents="$ctrl.documents" $close="$close(result)" $dismiss="$dismiss(reason)"></financial-documents-edit>',
        controller: ['documents', function(documents) {
          let $ctrl = this;
          $ctrl.documents = documents;
        }],
        controllerAs: '$ctrl',
        resolve: {
          documents: function(){
           return angular.copy($ctrl.documents);
           }
        }
      }).result.then(function(result){
        // modal saved - update $ctrl.documents with returned object
        console.info("saved ->"+ result);
        $ctrl.documents = result.documents;
        // modal dismissed
      }, function(reason) {
        console.info("dismissed ->"+ reason);
      });
    };
  }]
});
