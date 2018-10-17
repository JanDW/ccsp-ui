angular.
  module('applicationDetail').
  component('applicationDetail', {
    templateUrl: 'application-detail/application-detail.template.html',
    controller: [
			'$http',
			'$routeParams',
			function ApplicationDetailController($http, $routeParams) {
				var self = this;

				// self.setImage = function(imageUrl) {
				// 	self.mainImageUrl = imageUrl;
				// }

				$http.get('http://localhost:3000/employees/' + $routeParams.applicationId).then(function(response){
					self.application = response.data;
					console.log(self.application);
				});

        // this.phoneId = $routeParams.phoneId;
      }
    ]
  });
