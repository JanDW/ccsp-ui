/* jshint esversion:6 */
angular.
module('childrenList').
component('childrenList', {
  templateUrl: 'components/children-list/children-list.template.html',
  bindings: {
    // Two way data binding updates the award calculation but messes with the edit mode for the date of birth @TODO need to learn more about databinding in angularJS
    children: '<' //data gets passed in as an input on a children attribute on the custom element
  },
  controller: ['$uibModal',
    function ChildrenListController($uibModal) {
      var $ctrl = this;

      $ctrl.$onChanges = function(changes) {
        // Make sure the data is available:
        // Check objects are there.
        // Note: $onChanges works for one-way databinding only
        // @TODO There has to be a better solution that this kludgy mess
        if ( typeof $ctrl.children  === 'object' ) {
          // Create date objects for children-list-edit
          angular.forEach($ctrl.children, function(child){
            child._dateOfBirth = new Date(child.dateOfBirth);
          });
        }
      };



      $ctrl.editChildrenList = function(){
        console.table($ctrl.children);
       $uibModal.open({
        template: '<children-list-edit children="$ctrl.children" $close="$close(result)" $dismiss="$dismiss(reason)"></children-list-edit>',
        controller: ['children', function(children) {
          let $ctrl = this;
          $ctrl.children = children;

        }],
        controllerAs: '$ctrl',
        windowClass: 'modal-xl',
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
