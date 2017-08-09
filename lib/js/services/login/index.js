export default ['$http', '$q', 'AuthToken', 'CONFIG', function($http, $q, AuthToken, CONFIG){
  var self = {};

  var url = CONFIG.URL;

  // Initialization session of user in plication
  self.login = function(data){
    var d = $q.defer();

    $http({
      method: 'POST',
      url: url+'/php/verification/post.verificar.php',
      data: data
    }).then(function(res){
      AuthToken.setToken(res.data.tok);
      d.resolve(res.data);
    }, function(err){
      d.reject(err);
    });

    return d.promise;
  };


  return self;
}];