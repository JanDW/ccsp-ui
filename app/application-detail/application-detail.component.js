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

				$http.get('/phones/' + $routeParams.phoneId + '.json').then(function(response){
					self.application = response.data;
					self.setImage(self.phone.images[0]);
				});

        // this.phoneId = $routeParams.phoneId;
      }
    ]
  });
