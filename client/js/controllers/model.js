app.controller('model', ['$scope', '$http', 'growl', function($scope, $http, growl) {

	// 1) Create
	$scope.submit = function() {
		$http.post('/rest/model', $scope.model)
			.then(
				function(resp) {
					growl.success("New model created!");
					$scope.models.push(resp.data)
				},
				function(err) {
					growl.error('Error while saving the model, check your data and retry');
				}
			);
	};

	// 2) Read
	$http.get('/rest/model')
		.then(
			function(resp) {
				$scope.models = resp.data;
			},
			function(err) {
				console.log(err)
			}
		);

	// 2) Update
	$scope.update = function(model) {

		$http.put('/rest/model/' + model._id, model)
			.then(
				function(resp) {
					growl.success("Model updated!");
					_.map($scope.models, function(m) {
						if (m._id === resp.data._id)
							m.mdate = resp.data.mdate;
					})
				},
				function(err) {
					growl.error('Error while updating the model, check your data and retry');
				}
			);
	}

	// 2) Update
	$scope.delete = function(model) {

		console.log('cancello', model)
		$http.delete('/rest/model/' + model._id)
			.then(
				function(resp) {
					growl.success("Model deleted!");
					$scope.models.splice($scope.models.indexOf(model), 1);
				},
				function(err) {
					growl.error('Error while deleting the model');
				}
			);
	}

}]);
