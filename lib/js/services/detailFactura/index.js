export default ['$http', '$q', 'CONFIG', function($http, $q, CONFIG){

  // Variables globals of factura
  var self = {
    number_factura: undefined,
    requested_date: undefined,
    status: 'E',
    amount: 0,
    tax: 0,
    net_amount: 0,
    comment: undefined,
    client: undefined,
    detail: []
  };

  var url = CONFIG.URL;

  self.loadFactura = function(idFactura){
    var d = $q.defer();

    $http({
      method: 'GET',
      url: url+'/php/detailFactura/get.DetailFactura.php?id='+idFactura
    }).then(function(res){
      var factura = res.data.factura;
      var client = res.data.cliente;
      var detail = res.data.detalle;

      self.number_factura = factura.numero_factura;
      self.tax = factura.impuesto;
      self.requested_date = factura.fecha_solicitado;
      self.status = factura.estado;
      self.amount = factura.monto;
      self.net_amount = factura.monto_neto;
      self.comment = factura.comentario;
      self.client = client;
      self.detail = detail;

      d.resolve();
    }, function(err){
      d.reject();
    })

    return d.promise;
  };

  return self;

}];