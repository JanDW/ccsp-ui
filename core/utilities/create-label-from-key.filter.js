/*jshint esversion: 6*/


// See https://stackoverflow.com/questions/19614545/how-can-i-add-some-small-utility-functions-to-my-angularjs-application
// Also see Chapter 14 > Creating Custom Filters in "Pro AngularJS - Adam Freeman"

angular.module('core').filter('createLabelFromKey', function() {

  /*

  Converts camelCased strings (e.g. keys derived from the JSON API) into labels that can be used in the UI

  E.g. 'firstName' into 'First name'

  */

  return function(camelCaseString) {
    // Split string based on occurence uppercase characters
    // Join again delimited with spaces
    // Transform to lowercase
    if (typeof camelCaseString === 'string') {
      let label;
      label = camelCaseString.split(/(?=[A-Z])/).join(' ').toLowerCase();

      // uppercase first character in string
      label = label.charAt(0).toUpperCase() + label.slice(1);
      return label;
    }
  };


});
