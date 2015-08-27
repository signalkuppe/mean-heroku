var app = angular.module('app', ['ngRoute', 'angular-growl']);

app.config(['growlProvider', '$provide', function(growlProvider, $provide) {
	growlProvider.globalTimeToLive(3000);

	$provide.decorator('$q', ['$delegate', '$rootScope', function($delegate, $rootScope) {
		var pendingPromisses = 0;
		$rootScope.$watch(
			function() {
				return pendingPromisses > 0;
			},
			function(loading) {
				$rootScope.loading = loading;
			}
		);
		var $q = $delegate;
		var origDefer = $q.defer;
		$q.defer = function() {
			var defer = origDefer();
			pendingPromisses++;
			defer.promise.finally(function() {
				pendingPromisses--;
			});
			return defer;
		};
		return $q;
	}]);

}]);

app.run(['$rootScope', '$location', function($rootScope, $location) {
	// init rootScope
	$rootScope.appName = 'Application name'; //app name
	$rootScope.active = function(path, strict) { // active links in navbar
		return (strict ? $location.path() : $location.path().substr(0, path.length)) == path;
	};
}]);
