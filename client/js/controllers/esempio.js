app.controller('esempio',['$scope','$http','growl', function ($scope,$http,growl) {


	// 1) Create
	$scope.submit = function () {
		$http.post('/rest/model', $scope.model)
			.then(
				function (resp) {
	    	// this callback will be called asynchronously
	    	// when the response is available
				  growl.success("Modello creato!");
					$scope.models.push(resp.data)
				},
				function (err) {
    		// called asynchronously if an error occurs
					growl.error('Modello non salvato, controlla i dati e riprova');
				}
			);
	};

	// 2) Read
	$http.get('/rest/model')
		.then(
			function (resp) {
				// this callback will be called asynchronously
				// when the response is available
				// resp è tutto l'ogetto, prendo solo i dati
				$scope.models = resp.data;
			},
			function(err) {
			// called asynchronously if an error occurs
				console.log(err)
			}
	);

	// 2) Update
	$scope.update = function (model) {

		$http.put('/rest/model/'+model._id,model)
			.then(
				function (resp) {
					// this callback will be called asynchronously
					// when the response is available
					growl.success("Modello aggiornato!");
					_.map($scope.models,function (m) {
						if(m._id === resp.data._id)
							m.mdate = resp.data.mdate;
					})
					console.log(resp.data)
				},
				function(err) {
					growl.error('Modello non aggiornato, controlla i dati e riprova');
				}
		);
	}

	// 2) Update
	$scope.delete = function (model) {

		console.log('cancello',model)
		$http.delete('/rest/model/'+model._id)
			.then(
				function (resp) {
					// this callback will be called asynchronously
					// when the response is available
					growl.success("Modello eliminato!");
					$scope.models.splice( $scope.models.indexOf(model), 1 );
				},
				function(err) {
				// called asynchronously if an error occurs
					console.log(err)
				}
		);
	}

}]);
