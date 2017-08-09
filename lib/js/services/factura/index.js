export default ['$http', '$q', function($http, $q){

  // Variables globals of factura
  var self = {
    number_factura: undefined,
    requested_date: new Date(),
    status: 'E',
    amount: 0,
    net_amount: 0,
    tax: 0,
    ISV: 0,
    comment: undefined,
    client_id: undefined,
    detail: []
  };

  self.new_factura = function(){
    self.number_factura = undefined,
    self.requested_date = new Date(),
    self.status = 'E',
    self.comment = undefined,
    self.client_id = undefined,
    self.detail = []
  };

  self.recalculate = function(){
    self.amount = 0;
    var detail = self.detail;
    for (var i = 0; i < detail.length; i++) {
      self.amount += detail[i].precio_venta * detail[i].cantidad;
    }

    self.tax = self.amount*self.ISV;
    self.net_amount = self.amount+self.tax;
  };

  self.add_detail = function(add){
    self.detail.push(add);
    self.recalculate();
  };

  self.search_product = function(id){
    var d = $q.defer();

    $http({
      method: 'GET',
      url: './php/product/get.producto.php?id='+id
    }).then(function(res){
      var data = res.data;
      data.producto.cantidad = 1;
      d.resolve(data.producto);
    }, function(err){
      d.resolve(err);
    });

    return d.promise;
  };

  self.delete_detail = function(item){
    var index = self.detail.indexOf(item);
    self.detail.splice(index, 1);
    self.recalculate();
  };

  self.save_factura = function(){
    var d = $q.defer();
    $http({
      method: 'POST',
      url: './php/factura/post.guardarfactura.php',
      data: self
    }).then(function(res){
      d.resolve(res.data);
    }, function(err){
      d.reject();
      console.error(err);
    });

    return d.promise;
  };

  return self;

}];