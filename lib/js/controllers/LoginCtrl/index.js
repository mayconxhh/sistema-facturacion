// Controller Login
export default ['$scope', 'Login', 'CONFIG', function($scope, Login, CONFIG){
  $scope.invalid = false;
  $scope.loading = false;
  $scope.message = '';
  $scope.userLog = {};

  // Send data user
  $scope.login = function(data){
    $scope.loading = true;

    // Validation character of username
    if (data.username.length < 3 && data.username.length > 15) {
      $scope.invalid = true;
      $scope.message = 'Ingrese su usuario';
      return;
    }

    // Validation character of password
    if (data.username.password < 5 && data.username.password > 20) {
      $scope.invalid = true;
      $scope.message = 'Ingrese su contraseña';
      return;
    }

    // Process of login and autentification
    Login.login(data).then(function(res){
      $scope.invalid = false;
      $scope.loading = false;
      if (res.err) {
        $scope.invalid = true;
        $scope.message = res.mensaje;
      } else {
        location.href =CONFIG.URL;
      }
    }, function(err){
      console.log(err);
    });

  };
}];