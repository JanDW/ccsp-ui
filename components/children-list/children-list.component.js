/* jshint esversion:6 */
angular.
module('childrenList').
component('childrenList', {
  templateUrl: 'components/children-list/children-list.template.html',
  bindings: {
    // Two way data binding updates the award calculation but messes with the edit mode for the date of birth @TODO need to learn more about databinding in angularJS
    children: '=' //data gets passed in as an input on a children attribute on the custom element
  },
  controller: ['$uibModal',
    function ChildrenListController($uibModal) {
      var $ctrl = this;

      $ctrl.editChildrenList = function(){
        console.table($ctrl.children);
       $uibModal.open({
        template: '<children-list-edit children="$ctrl.children" $close="$close(result)" $dismiss="$dismiss(reason)"></children-list-edit>',
        controller: ['children', function(children) {
          let $ctrl = this;
          $ctrl.children = children;

        }],
        controllerAs: '$ctrl',
        windowClass: 'modal-xl', // accommodate a table element
        resolve: {
          children: function(){
           return angular.copy($ctrl.children);
           }
        }
      }).result.then(function(result){
        // modal saved - update $ctrl.children with returned object
        console.info("saved ->"+ result);
        $ctrl.children = result.children;
        // modal dismissed
      }, function(reason) {
        console.info("dismissed ->"+ reason);
      });
    };
    }
  ]
});
