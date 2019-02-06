/* jshint esversion:6 */

angular.module('awardDetail').component('awardDetail', {
  templateUrl: 'components/award-detail/award-detail.template.html',
  bindings: {
    employee: '<', //data gets passed in as an input on an employee attribute on the custom element
    spouse: '<',
    children: '<',
    tccTuition: '<',
    awards: '=',
    totalIncome: '<', //One-way binding required for $onChanges to trigger when totalIncome has updated
  },
  controller: [
    '$scope',
    '$uibModal',
    '$rootScope',
    function AwardDetailController($scope, $uibModal, $rootScope) {
      var $ctrl = this;

      // @TODO break this up in small functions

      // @TODO This is really kludgy, there has to be a much better way of dealing with making sure the data is here

      // Note: $onChanges is for one-way bindings

      $ctrl.isCalculationCollapsed = true;

      $ctrl.$onChanges = function(changes) {
        let isDataLoaded = false;

        // Make sure the data is available:
        // Check objects are there. For spouse, check if a spouseId exists
        // before checking if object exists
        // Note: $onChanges works for one-way databinding only
        // @TODO There has to be a better solution that this kludgy mess
        if (
          typeof $ctrl.employee === 'object' &&
          typeof $ctrl.children === 'object' &&
          typeof $ctrl.tccTuition === 'object' &&
          typeof $ctrl.awards === 'object' &&
          typeof $ctrl.totalIncome === 'number'
        ) {
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
          // $ctrl.totalIncome = ($ctrl.employee.salary || 0) +
          //                ($ctrl.employee.additionalIncome || 0) + ($ctrl.spouse.salary || 0) +
          //                ($ctrl.spouse.additionalIncome || 0);

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
          $ctrl.incomeMaxAdjusted =
            $ctrl.INCOME_MAX +
            ($ctrl.numberOfChildren - 1) *
              $ctrl.INCOME_MAX_CAP_INCREASE_PER_CHILD; // adjust INCOME_MAX to include cap increase for additional children

          $ctrl.monthlyTuitionTotal = 0;
          $ctrl.employeeTuitionContributionTotal = 0;
          $ctrl.monthlyAwardTotal = 0;

          // Is employee eligible based on income?
          // Does income exceed the maximum (adjusted for addtl. children)
          $ctrl.eligible = $ctrl.totalIncome <= $ctrl.incomeMaxAdjusted; // boolean

          if ($ctrl.eligible) {
            /* INCOME */

            //@TODO account for incomeOverIncomeMin being negative (income is lower than $ctrl.INCOME_LOWEST_STEP = 40000; )
            $ctrl.incomeOverIncomeMin =
              $ctrl.totalIncome - $ctrl.INCOME_LOWEST_STEP; // How much more income than minimum threshold is there?

            if ($ctrl.incomeOverIncomeMin < 0) {
              $ctrl.incomeOverIncomeMin = 0;
            }

            /* Expected 5-day family contribution percentage adjusted for income*/
            $ctrl.calculatedFiveDayIncomeContributionPercentage =
              $ctrl.INCOME_LOWEST_STEP_CONTRIBUTION_PERCENTAGE +
              Math.floor(
                $ctrl.incomeOverIncomeMin / $ctrl.INCOME_INCREASE_STEP_AMOUNT
              ) *
                $ctrl.INCOME_INCREASE_STEP_PERCENTAGE; // Raise the INCOME_LOWEST_STEP_CONTRIBUTION_PERCENTAGE by exceeded income step amount %

            /* CHILDREN */
            // For each additional child, contribution percentage reduces to 85% of its original value
            $ctrl.calculatedIncomeContributionPercentage =
              $ctrl.calculatedFiveDayIncomeContributionPercentage *
              Math.pow(
                $ctrl.CONTRIBUTION_FACTOR_MULTIPLE_CHILDREN,
                $ctrl.numberOfChildren - 1
              );

            $ctrl.children.forEach(function(child) {
              // Lookup tuition if child was added in UI or changes were made
              if (child.tccCenter.toLowerCase() === 'westgate') {
                if (child.schedule.toLowerCase() === 'half-time') {
                  child.monthlyTuition =
                    $ctrl.tccTuition.westgate.preschool.fiveDayMornings;
                } else {
                  child.monthlyTuition =
                    $ctrl.tccTuition.westgate.preschool.fiveDay;
                }
              } else if (child.tccCenter.toLowerCase() === 'linc') {
                if (child.classRoom.toLowerCase() === 'infant') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition = $ctrl.tccTuition.linc.infant.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.infant.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition = $ctrl.tccTuition.linc.infant.fiveDay;
                  }
                }
                if (child.classRoom.toLowerCase() === 'toddler') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition = $ctrl.tccTuition.linc.toddler.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.toddler.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.toddler.fiveDay;
                  }
                }
                if (child.classRoom.toLowerCase() === 'preschool') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.preschool.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.preschool.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.linc.preschool.fiveDay;
                  }
                }
              } else {
                // default: stata, eastgate, koch
                if (child.classRoom.toLowerCase() === 'infant') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.infant.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.infant.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.infant.fiveDay;
                  }
                }
                if (child.classRoom.toLowerCase() === 'toddler') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.toddler.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.toddler.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.toddler.fiveDay;
                  }
                }
                if (child.classRoom.toLowerCase() === 'preschool') {
                  if (child.daysPerWeek === 2) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.preschool.twoDay;
                  }
                  if (child.daysPerWeek === 3) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.preschool.threeDay;
                  }
                  if (child.daysPerWeek === 5) {
                    child.monthlyTuition =
                      $ctrl.tccTuition.default.preschool.fiveDay;
                  }
                }
              }

              /* adjust expected contribution per child based on schedule */
              if (child.daysPerWeek === 2) {
                child.employeeTuitionContributionPercentage =
                  $ctrl.calculatedIncomeContributionPercentage *
                  $ctrl.TWO_DAY_SLOT_ADJUSTMENT;
              }
              if (child.daysPerWeek === 3) {
                child.employeeTuitionContributionPercentage =
                  $ctrl.calculatedIncomeContributionPercentage *
                  $ctrl.THREE_DAY_SLOT_ADJUSTMENT;
              }
              if (child.daysPerWeek === 5) {
                child.employeeTuitionContributionPercentage =
                  $ctrl.calculatedIncomeContributionPercentage;
              }
              child.employeeTuitionContribution =
                ($ctrl.totalIncome / 12) *
                child.employeeTuitionContributionPercentage;

              child.monthlyAward =
                child.monthlyTuition - child.employeeTuitionContribution;

              // Employee pays full tuition
              if (child.monthlyAward <= 0) {
                child.monthlyAward = 0;
                child.employeeTuitionContribution = child.monthlyTuition;
              }

              // Make sure award doesn't exceed 73% of tuition
              if (
                child.monthlyAward >
                child.monthlyTuition * $ctrl.AWARD_LIMIT_PERCENTAGE_OF_TUITION
              ) {
                child.monthlyAwardLimited =
                  child.monthlyTuition *
                  $ctrl.AWARD_LIMIT_PERCENTAGE_OF_TUITION;
              } else {
                child.monthlyAwardLimited = child.monthlyAward;
              }

              /* add monthly tuition for child to total */
              $ctrl.monthlyTuitionTotal += child.monthlyTuition;

              /* add monthly calculated employee contribution to total */
              $ctrl.employeeTuitionContributionTotal +=
                child.employeeTuitionContribution;

              /* add monthly limited award to total */
              $ctrl.monthlyAwardTotal += child.monthlyAwardLimited;
            });

            // $injector.invoke(['$rootScope', function($rootScope){
            // $rootScope.$watch('$ctrl.monthlyAwardTotal', function(newValue, oldValue) {
            //   $parent.$ctrl.isAwardChanged = true;
            // });
            // }]);

            //@TODO check where to round and were not to round up values!
            // Also in template

            if ($ctrl.employee.fundingSource === 'Combined') {
              $ctrl.employee.fundingSourceEmployeeAwardMonthlyAmount =
                $ctrl.monthlyAwardTotal *
                ($ctrl.employee.fundingSourceEmployeePercentage / 100);

              $ctrl.employee.fundingSourceFellowAwardMonthlyAmount =
                $ctrl.monthlyAwardTotal *
                ($ctrl.employee.fundingSourceFellowPercentage / 100);
            }

            // PRORATION
            // Assuming above start and end dates
            // (monthlyAwardLimited / total business days Oct) * remaining businessdays
            // from awardStartDate
            $ctrl.proratedOctober = ($ctrl.monthlyAwardTotal / 23) * 13;
          }
        }
      };

      // //@TODO hardcoded dates
      $ctrl.award = {};
      $ctrl.award.awardStartDate = new Date('2018-10-14T00:00:00');
      $ctrl.award.awardEndDate = new Date('2019-08-31T00:00:00');

      // If the award changes we need to show the "Draft Award" toolbar
      // In order to do so, subscribe to the award and set a flag on the parent
      $scope.$watch('$ctrl.monthlyAwardTotal', function(
        newValue,
        oldValue,
        scope
      ) {
        // Check that application has confirmed status
        if (
          $scope.$parent &&
          $scope.$parent.$ctrl &&
          $scope.$parent.$ctrl.application &&
          $scope.$parent.$ctrl.application.statusCode === 4
        ) {
          // Make sure it's not initial databinding
          if (oldValue !== undefined && newValue !== oldValue) {
            $scope.$parent.$ctrl.isAwardChanged = true;
            console.log('Award changed!');
          }
        }
      });

      $ctrl.editAward = function() {
        $uibModal
          .open({
            template:
              '<award-detail-edit award="$ctrl.award" $close="$close(result)" $dismiss="$dismiss(reason)"></award-detail-edit>',
            controller: [
              'award',
              function(award) {
                let $ctrl = this;
                $ctrl.award = award;
              },
            ],
            controllerAs: '$ctrl',
            resolve: {
              award: function() {
                return angular.copy($ctrl.award);
              },
            },
          })
          .result.then(
            function(result) {
              // modal saved - update $ctrl.employee $ctrl.spouse with returned object
              console.info('saved ->' + result);
              $ctrl.award = result.award;

              // modal dismissed
            },
            function(reason) {
              console.info('dismissed ->' + reason);
            }
          );
      };
    },
  ],
});
