export default ['$http', '$q', 'CONFIG', function($http, $q, CONFIG){

  // Data of client and pagination
  var self = {
    load        :false,
    err         :false, 
    count       :0,
    clients     :[],
    pag_current :1,
    pag_next    :1,
    pag_prev    :1,
    all_pages   :1,
    pages       :[]
  };

  var url = CONFIG.URL;

  // Search clients for filter
  self.search = function(data){
    var d = $q.defer();

    self.load = true;
    $http({
      method: 'GET',
      url: url+'/php/clients/get.Client.php?p='+data
    }).then(function(res){
      self.load = false;
      self.clients = res.data.clientes;
      d.resolve();
    }, function(err){
      d.reject(err);
    });

    return d.promise;
  }

  // Get clients for pagination
  self.loadPages = function( page ){
    self.load = true;
    var d = $q.defer();

    var url = '';

    if (page) {
      url = url+'/php/clients/get.Clients.php?page='+page;
    } else {
      url = url+'/php/clients/get.Clients.php'
    }

    $http({
      method: 'GET',
      url: url
    }).then(function(res){

      var data = res.data;

      self.load         = false;
      self.err          = data.err; 
      self.count        = data.conteo;
      self.clients      = data.clientes;
      self.pag_current  = data.pag_actual;
      self.pag_next     = data.pag_siguiente;
      self.pag_prev     = data.pag_anterior;
      self.all_pages    = data.total_paginas;
      self.pages        = data.paginas;

      return d.resolve();
    }, function(err){
      return d.reject();
    });

    return d.promise;
  };

  // Save and update data of clients
  self.save = function(client){
    var d = $q.defer();

    $http({
      method: 'POST',
      url: url+'/php/clients/post.ClientSave.php',
      data: client
    }).then(function(res){
      self.loadPages(self.pag_current);
      d.resolve();
    }, function(err){
      d.reject();
    });

    return d.promise;
  };

  return self;
}]