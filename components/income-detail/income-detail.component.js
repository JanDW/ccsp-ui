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


      // Make sure the data has been passed via the bindings
      // https://medium.com/front-end-hacking/angularjs-onchanges-component-hook-as-solution-for-not-ready-bindings-cb78335c3f5e
      self.$onChanges = function(changes) {
        const incomes = [];

        // if employee is no longer undefined, data is here
        if(typeof this.employee === 'object') {
          // add property values to array if not undefined
          if (self.employee.salary) { incomes.push(self.employee.salary); }
          if (self.employee.additionalIncome) { incomes.push(self.employee.additionalIncome); }
          if (self.spouse && self.spouse.salary) { incomes.push(self.spouse.salary); } // check if spouse exists first, checking property on undefined obj would throw err
          if (self.spouse && self.spouse.additionalIncome) { incomes.push(self.spouse.additionalIncome); }

          // add array elements together
          self.totalIncome = incomes.reduce((a, b) => a + b, 0);

          self.numberOfColumnsSpan = 12 / incomes.length;
        }
      };
    }
  ]
});
