export default ['AuthToken', '$q', '$http', '$window', function(AuthToken, $q, $http, $window){
  var self = {};

  // Verification of session active of user
  self.isLoggedIn = function(){
    if (AuthToken.getToken()) {
      return true;
    } else {
      return false;
    }
  };

  // Logout user
  self.logout = function(){
    var d = $q.defer();

    $http({
      method: 'POST',
      url: './php/user/shutdown.User.php'
    }).then(function(res){
      AuthToken.setToken();
      d.resolve(res.data.success);
    }, function(err){
      d.reject(err);
    });

    return d.promise;
  };

  // Get data user
  self.getUser = function(){
    var d = $q.defer();

    $http({
      method: 'GET',
      url: './php/user/get.User.php',
    }).then(function(res){
      var data = res.data;
      if (data.success) {
        d.resolve(data.user);        
      } else {
        self.logout();
        d.reject({success: data.success});
      }
    }, function(err){
      d.reject(err);
    });

    return d.promise;
  }

  return self;
}];