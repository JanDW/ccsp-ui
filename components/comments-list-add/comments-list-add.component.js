angular.module('commentsListAdd').component('commentsListAdd', {
  templateUrl: 'components/comments-list-add/comments-list-add.template.html',
  bindings: {
    $close: '&',
    $dismiss: '&',
    application: '=', //data gets passed in as an input on an application attribute on the custom element
  },
  controller: [
    function CommentsListAddController() {
      let $ctrl = this;
      $ctrl.comment = {};
      $ctrl.comment.message = '';

      // close modal, return changes
      $ctrl.handleClose = function() {
        $ctrl.comment.timestamp = new Date().toISOString();
        $ctrl.comment._timestamp = new Date();
        $ctrl.comment.author = 'Alex Admin';
        $ctrl.comment.type = 'internal';
        $ctrl.$close({
          result: $ctrl.comment,
        });
      };

      // dismiss modal
      $ctrl.handleDismiss = function() {
        $ctrl.$dismiss({
          reason: 'cancelled',
        });
      };
    },
  ],
});
