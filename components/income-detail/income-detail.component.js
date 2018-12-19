angular.
module('incomeDetail').
component('incomeDetail', {
  templateUrl: 'components/income-detail/income-detail.template.html',
  bindings: {
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '<',
    totalIncome: '='
  },
  controller: ['$uibModal',
    function IncomeDetailController($uibModal) {

      let $ctrl = this;
      // $ctrl.totalIncome = 0;
      $ctrl.numberOfColumnsSpan = 0;

      // Make sure the data has been passed via the bindings
      // https://medium.com/front-end-hacking/angularjs-onchanges-component-hook-as-solution-for-not-ready-bindings-cb78335c3f5e
      $ctrl.$onChanges = function(changes) {

        // if employee is no longer undefined, data is here
        if(typeof this.employee === 'object' &&
           typeof this.totalIncome === 'number') {
          // calculateColumns is used to determine the span of the columns based on which incomes are populated
          $ctrl.calculateColumns = function () {
            const incomes = [];
            // add property values to array if not undefined
            if ($ctrl.employee.salary) { incomes.push($ctrl.employee.salary); }
            if ($ctrl.employee.additionalIncome) { incomes.push($ctrl.employee.additionalIncome); }
            if ($ctrl.spouse && $ctrl.spouse.salary) { incomes.push($ctrl.spouse.salary); } // check if spouse exists first, checking property on undefined obj would throw err
            if ($ctrl.spouse && $ctrl.spouse.additionalIncome) { incomes.push($ctrl.spouse.additionalIncome); }

            // add array elements together
            //$ctrl.totalIncome = incomes.reduce((a, b) => a + b, 0);

            $ctrl.numberOfColumnsSpan = 12 / incomes.length;
          };

        }

        $ctrl.calculateColumns();
      };

      $ctrl.editIncome= function(){
       $uibModal.open({
        template: '<income-detail-edit employee="$ctrl.employee" spouse="$ctrl.spouse" $close="$close(result)" $dismiss="$dismiss(reason)"></income-detail-edit>',
        controller: ['employee', 'spouse', function(employee, spouse) {
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
        // Create spouse object if it doesn't exist since we'll check for properties on it next
        if (typeof result.spouse === 'undefined') { result.spouse = {}; }
        // Update total income with new values
        $ctrl.totalIncome = result.employee.salary + (result.employee.additionalIncome || 0) + (result.spouse.salary || 0) + (result.spouse.additionalIncome || 0);

        // See if we need to adjust columns
        $ctrl.calculateColumns();
        // modal dismissed
      }, function(reason) {
        console.info("dismissed ->"+ reason);
      });
    };

    }
  ]
});
