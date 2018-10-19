/* jshint esversion:6 */
angular.
module('childrenList').
component('childrenList', {
  templateUrl: 'components/children-list/children-list.template.html',
  bindings: {
    children: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: [
    function ChildrenListController() {
      var self = this;
    }
  ]
});
