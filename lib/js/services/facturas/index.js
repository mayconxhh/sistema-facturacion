export default ['$http', '$q', function($http, $q){

  // Data of client and pagination
  var self = {
    load        :false,
    err         :false, 
    count       :0,
    facturas     :[],
    pag_current :1,
    pag_next    :1,
    pag_prev    :1,
    all_pages   :1,
    pages       :[]
  };

  // Get clients for pagination
  self.loadPages = function( page ){
    self.load = true;
    var d = $q.defer();

    var url = '';

    if (page) {
      url = './php/factura/get.Facturas.php?page='+page;
    } else {
      url = './php/factura/get.Facturas.php'
    }

    $http({
      method: 'GET',
      url: url
    }).then(function(res){

      var data = res.data;

      self.load         = false;
      self.err          = data.err; 
      self.count        = data.conteo;
      self.facturas     = data.facturas;
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

  self.searchFacturas = function(search){
    self.load = true;
    var d = $q.defer();

    var url = './php/factura/get.Factura.php?search='+search

    $http({
      method: 'GET',
      url: url
    }).then(function(res){

      var data = res.data;

      self.load         = false;
      self.err          = undefined; 
      self.count        = undefined;
      self.facturas     = data.facturas;
      self.pag_current  = undefined;
      self.pag_next     = undefined;
      self.pag_prev     = undefined;
      self.all_pages    = undefined;
      self.pages        = undefined;

      return d.resolve();
    }, function(err){
      return d.reject();
    });

    return d.promise;
  }

  return self;
}]