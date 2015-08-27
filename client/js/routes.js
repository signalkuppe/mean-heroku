app.config(function($routeProvider)
{
  $routeProvider
    .when('/',
    {
      controller: 'home',
      templateUrl: '/html/views/home.html'
    })
    .when('/esempio',
    {
      controller: 'esempio',
      templateUrl: '/html/views/esempio.html'
    })
    .otherwise(
    {
      redirectTo: '/'
    });
});
