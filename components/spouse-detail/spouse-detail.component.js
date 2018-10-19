/* jshint esversion:6 */
angular.
module('spouseDetail').
component('spouseDetail', {
  templateUrl: 'components/spouse-detail/spouse-detail.template.html',
  bindings: {
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '<'
  },
  controller: [
    function SpouseDetailController() {
      var self = this;
    }
  ]
});
