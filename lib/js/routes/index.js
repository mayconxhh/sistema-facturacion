// Configuration of aplication
export default ['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
  // Insert autentification
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: './views/dashboard',
      authenticated: true
    })
    .when('/clientes', {
      templateUrl: './views/clients',
      controller: 'clientsCtrl',
      authenticated: true
    })
    .when('/facturas', {
      templateUrl: './views/facturas',
      controller: 'facturasCtrl',
      authenticated: true
    })
    .when('/facturas/detalle/:id', {
      templateUrl: './views/facturas/detalle',
      controller: 'detailFacturaCtrl',
      authenticated: true
    })
    .when('/facturas/nueva', {
      templateUrl: './views/facturas/nueva',
      controller: 'newFacturaCtrl',
      authenticated: true
    })
    .when('/login', {
      templateUrl: './views/login',
      controller: 'loginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  // Removing #!/ of url
  $locationProvider.html5Mode(true);
}];