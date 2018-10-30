angular.module('core').filter('pow', function() {
  return function(number, power) {
    return Math.pow(number, power);
  };
});
