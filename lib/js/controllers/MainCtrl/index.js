export default ['$scope', 'Configuration', 'Messages', 'Notifications', '$location', '$rootScope', 'CONFIG', 'Auth', function($scope, Configuration, Messages, Notifications, $location, $rootScope, CONFIG, Auth){
  $scope.config = {};
  $scope.messages = Messages.messages;
  $scope.notifications = Notifications.notifications;

  $scope.url = CONFIG.URL;

  $scope.user = {};

  // Load Data of proyect
  Configuration.load().then(function(res){
  	$scope.config = Configuration.config;
  }, function(err){
  	console.log(err);
  });

  // Global functions
  $scope.isActive = function(url){
    return url === $location.path();
  };

  // User session shutdown
  $scope.logout = function(){
    Auth.logout().then(function(res){
      $location.path('/login');
    }, function(err){
      console.err(err);
    });
  };

  // Variable global
  $rootScope.$on('$routeChangeStart', function(){
    $scope.access = false;
    $scope.HeadSubtitle = '';
    $scope.title = '';
    $scope.subtitle = '';

    // Checking user session
    if (Auth.isLoggedIn()) {
      $scope.access = true;
    } else {
      $scope.access = false;
    }

    // Data of page
    if ($location.path() === '/') {
      $scope.title = 'Dashboard';
      $scope.subtitle = 'información';
      $scope.HeadSubtitle = '| Dashboard';

    } else if($location.path() ==='/clientes'){
      $scope.title = 'Clientes';
      $scope.subtitle = 'listado';
      $scope.HeadSubtitle = '| Clientes';

    } else if($location.path() ==='/facturas') {

      $scope.title = 'Facturas';
      $scope.subtitle = 'listado';
      $scope.HeadSubtitle = '| Facturas';
      
    } else if('/'+$location.path().split('/')[1]+'/'+$location.path().split('/')[2]+'/' ==='/facturas/detalle/') {

      $scope.title = 'Facturas';
      $scope.subtitle = 'detalle';
      $scope.HeadSubtitle = '| Detalle de Factura';
      
    } else if($location.path() ==='/facturas/nueva') {

      $scope.title = 'Facturas';
      $scope.subtitle = 'Nueva factura';
      $scope.HeadSubtitle = '| Nueva Factura';
      
    } else if($location.path() === '/login'){
      $scope.HeadSubtitle = '| Login';
    }

    // Get user data
    Auth.getUser().then(function(res){
      var data = {
        name: res.nombre,
        id: res.id,
        username: res.codigo
      };
      angular.copy(data, $scope.user);
    }, function(err){
      if (!err.success) {
        $location.path('/login');
      }
    });


  })

}];