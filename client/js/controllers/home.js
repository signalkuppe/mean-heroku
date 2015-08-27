app.controller('home',['$scope','growl', function ($scope,growl) {

	growl.success("I messaggi appaiono!");
	growl.info("Con la info.");
	growl.warning("C'è anche il warning!");
	growl.error("E l'errore...");
}]);