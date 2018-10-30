/* jshint esversion:6 */
angular.
module('awardDetail').
component('awardDetail', {
  templateUrl: 'components/award-detail/award-detail.template.html',
  bindings: {
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '<',
    children: '<',
    tccTuition: '<'
  },
  controller: ['$uibModal',
    function AwardDetailController($uibModal) {
      var $ctrl = this;

      // @TODO break this up in small functions

      // @TODO This is really kludgy, there has to be a much better way of dealing with making sure the data is here

      // Note: $onChanges is for one-way bindings

      $ctrl.$onChanges = function(changes) {
        let isDataLoaded = false;

        // Make sure the data is available:
        // Check objects are there. For spouse, check if a spouseId exists
        // before checking if object exists
        // Note: $onChanges works for one-way databinding only
        // @TODO There has to be a better solution that this kludgy mess
        if ( typeof $ctrl.employee   === 'object' &&
             typeof $ctrl.children   === 'object' &&
             typeof $ctrl.tccTuition === 'object') {
          if (typeof $ctrl.employee.spouseId === 'undefined') {
            $ctrl.spouse = {}; // checking properties on this object later on, so it needs to exist
            isDataLoaded = true;
          } else if (typeof $ctrl.spouse === 'object') {
            isDataLoaded = true;
          }
        }

        if (isDataLoaded) {
          // Award calculation

          // calculate income, not all properties might be present
          $ctrl.totalIncome = ($ctrl.employee.salary || 0) +
                         ($ctrl.employee.additionalIncome || 0) + ($ctrl.spouse.salary || 0) +
                         ($ctrl.spouse.additionalIncome || 0);


          $ctrl.numberOfChildren = $ctrl.children.length;

          // AWARD related constants -- uppercase to indicate that these variables are constants not set in our system

          $ctrl.INCOME_MAX = 140000; // maximum income limit for eligibility
          $ctrl.INCOME_MAX_CAP_INCREASE_PER_CHILD = 10000; // increase for income max limit per additional child

          $ctrl.INCOME_LOWEST_STEP = 40000; // income =< this amount === lowest contribution step (1 child / 5 day)
          $ctrl.INCOME_LOWEST_STEP_CONTRIBUTION_PERCENTAGE = 0.17; // corresponding percentage of tuition to be paid for lowest income contribution step

          $ctrl.INCOME_INCREASE_STEP_AMOUNT = 5000; // contribution % goes up per x dollars over INCOME_LOWEST step
          $ctrl.INCOME_INCREASE_STEP_PERCENTAGE = 0.00125; // percentage by which the contribution goes up

          $ctrl.THREE_DAY_SLOT_ADJUSTMENT = 0.73; // Multiply by incomeIncreaseStepPercentage
          $ctrl.TWO_DAY_SLOT_ADJUSTMENT = 0.51; // Multiply by incomeIncreaseStepPercentage

          $ctrl.CONTRIBUTION_FACTOR_MULTIPLE_CHILDREN = 0.85; // contribution percentage adjustment per additional child

          $ctrl.AWARD_LIMIT_PERCENTAGE_OF_TUITION = 0.73; // Max percentage of total tuition cost MIT award can amount to.


          // Vars
          $ctrl.incomeMaxAdjusted = $ctrl.INCOME_MAX + ($ctrl.numberOfChildren - 1) * $ctrl.INCOME_MAX_CAP_INCREASE_PER_CHILD; // adjust INCOME_MAX to include cap increase for additional children

          $ctrl.monthlyTuitionTotal = 0;
          $ctrl.employeeTuitionContributionTotal = 0;

          // Is employee eligible based on income?
          // Does income exceed the maximum (adjusted for addtl. children)
          $ctrl.eligible = $ctrl.totalIncome <= $ctrl.incomeMaxAdjusted; // boolean

          if ($ctrl.eligible) {

            /* INCOME */
            $ctrl.incomeOverIncomeMin = $ctrl.totalIncome - $ctrl.INCOME_LOWEST_STEP; // How much more income than minimum threshold is there?

            /* Expected 5-day family contribution percentage adjusted for income*/
            $ctrl.calculatedIncomeContributionPercentage = $ctrl.INCOME_LOWEST_STEP_CONTRIBUTION_PERCENTAGE  + Math.floor($ctrl.incomeOverIncomeMin / $ctrl.INCOME_INCREASE_STEP_AMOUNT) * $ctrl.INCOME_INCREASE_STEP_PERCENTAGE; // Raise the INCOME_LOWEST_STEP_CONTRIBUTION_PERCENTAGE by exceeded income step amount %

            /* CHILDREN */
            // For each additional child, contribution percentage reduces to 85% of its original value
            $ctrl.calculatedIncomeContributionPercentage = $ctrl.calculatedIncomeContributionPercentage * Math.pow($ctrl.CONTRIBUTION_FACTOR_MULTIPLE_CHILDREN, ($ctrl.numberOfChildren - 1));




            $ctrl.children.forEach(function(child){
              /* adjust expected contribution per child based on schedule */
              if (child.daysPerWeek === 2) {
                child.employeeTuitionContributionPercentage = $ctrl.calculatedIncomeContributionPercentage * $ctrl.TWO_DAY_SLOT_ADJUSTMENT;
              }
              if (child.daysPerWeek === 3) {
                child.employeeTuitionContributionPercentage = $ctrl.calculatedIncomeContributionPercentage * $ctrl.THREE_DAY_SLOT_ADJUSTMENT;
              }
              if (child.daysPerWeek === 5) {
                child.employeeTuitionContributionPercentage = $ctrl.calculatedIncomeContributionPercentage;
              }
              child.employeeTuitionContribution = child.monthlyTuition * child.employeeTuitionContributionPercentage;

              /* add monthly tuition for child to total */
              $ctrl.monthlyTuitionTotal += child.monthlyTuition;

              /* add monthly calculated employee contribution to total */
              $ctrl.employeeTuitionContributionTotal += child.employeeTuitionContribution;
            });

            /* Calculate monthly award */
            $ctrl.monthlyAward = $ctrl.monthlyTuitionTotal - $ctrl.employeeTuitionContributionTotal;


            // Make sure award doesn't exceed maximum allowable percentage of tuition
            if ($ctrl.monthlyAward > $ctrl.monthlyTuitionTotal * $ctrl.AWARD_LIMIT_PERCENTAGE_OF_TUITION) {
              $ctrl.monthlyAwardLimited = $ctrl.monthlyTuitionTotal * $ctrl.AWARD_LIMIT_PERCENTAGE_OF_TUITION;
            } else {
              $ctrl.monthlyAwardLimited = $ctrl.monthlyAward;
            }


          }
        }
      };

      $ctrl.editAward = function(){
       $uibModal.open({
        template: '<award-detail-edit employee="$ctrl.employee" spouse="$ctrl.spouse" $close="$close(result)" $dismiss="$dismiss(reason)"></award-detail-edit>',
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
