angular.module('globalNav').component('globalNav', {
  templateUrl: 'components/global-nav/global-nav.template.html',
  bindings: {},
  controller: [
    function GlobalNavController() {
      var $ctrl = this;
      angular
        .element(document)
        .find('.nav-item')
        .on('click', function() {
          $('.nav-item').removeClass('active');
          $(this).addClass('active');
        });
    },
  ],
});
