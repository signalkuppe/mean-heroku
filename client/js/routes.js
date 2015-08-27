app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'home',
			templateUrl: '/html/views/home.html'
		})
		.when('/model', {
			controller: 'model',
			templateUrl: '/html/views/model.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
