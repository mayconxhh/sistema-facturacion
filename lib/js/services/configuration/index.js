export default ['$http', '$q', function($http, $q){

  var self = {
    config:  {}
  }

  // load data of proyect
  // Configuration.load()
  self.load = function(){
    var d = $q.defer();
    $http({
      method: 'GET',
      url:'config.json'
    }).then(function(res){
      self.config = res.data;
      d.resolve();
    }, function(err){
      console.error('No se pudo cargar el archivos de configuracion');
      d.reject();
    });

    return d.promise;
  }

  return self;
}]