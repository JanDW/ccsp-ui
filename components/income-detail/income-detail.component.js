angular.
module('incomeDetail').
component('incomeDetail', {
  templateUrl: 'components/income-detail/income-detail.template.html',
  bindings: {
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '<'
  },
  controller: [
    function IncomeDetailController() {

      let self = this;

      //Make sure the data has been passed via the bindings
      self.$onChanges = function(changes) {
        // if employee and spouse are no longer undefined, data is here
        if(typeof this.employee === 'object' && typeof this.spouse === 'object') {
          // if undefined add 0
          self.totalIncome = (self.employee.salary || 0) +
                             (self.employee.additionalIncome || 0) +
                             (self.spouse.salary || 0) +
                             (self.spouse.additionalIncome || 0);
        }
      };
    }
  ]
});
