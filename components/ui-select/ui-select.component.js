angular.
module('uiSelect').
component('uiSelect', {
  templateUrl: 'components/ui-select/ui-select.template.html',
  bindings: {
  },
  controller: ['$location','$uibModal',
    function UiSelectController($location,$uibModal) {
      $ctrl = this;
      $ctrl.viewAdminUi = function() {
        $location.path('/application-inbox');
      };





  }]
});
