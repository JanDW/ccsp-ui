angular.module('core').filter('floor', function() {
  return function(number) {
    return Math.floor(number);
  };
});
