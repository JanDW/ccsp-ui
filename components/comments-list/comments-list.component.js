angular.
module('commentsList').
component('commentsList', {
  templateUrl: 'components/comments-list/comments-list.template.html',
  bindings: {
    application: '<' //data gets passed in as an input on an employee attribute on the custom element
  },
  controller: ['$uibModal',
    function CommentsListController($uibModal) {
      var $ctrl = this;

      $ctrl.isExternalCommentCollapsed = true;
      $ctrl.isInternalCommentCollapsed = true;

      // $onChanges requires one-way binding
      $ctrl.$onChanges = function(changes) {
        if ( typeof $ctrl.application === 'object') {
          $ctrl.application.comments.forEach(function(comment){
            comment._timestamp = new Date(comment.timestamp);
          });
        }
      };

      $ctrl.addComment = function(){
       $uibModal.open({
        template: '<comments-list-add application="$ctrl.application" $close="$close(result)" $dismiss="$dismiss(reason)"></comments-list-add>',
        controller: ['application', function(application) {
          let $ctrl = this;
          $ctrl.application = application;
        }],
        controllerAs: '$ctrl',
        resolve: {
          application: function(){
           return angular.copy($ctrl.application); //return a copy so changes don't get pushed up
          }
        }
      }).result.then(function(result){
        // modal saved - update $ctrl.employee with returned object
        console.info("saved ->"+ result);
        console.table(result);
        $ctrl.application.comments.push(result);
        // modal dismissed
      }, function(reason) {
        console.info("dismissed ->"+ reason);
      });
    };
  }]
});
