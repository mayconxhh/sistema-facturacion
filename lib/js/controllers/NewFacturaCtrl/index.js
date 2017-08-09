export default ['$scope', '$location', 'Clients', 'Factura', function($scope, $location, Clients, Factura){
  $scope.client = {};
  $scope.search = '';
  $scope.addProduct = {
    productId: '',
    amount: 1
  };

  $scope.factura = Factura;
  $scope.factura.ISV = $scope.config.ISV;

  $scope.today = new Date();

  $scope.searchClient = function(search){
    $scope.clients = null;

    Clients.search(search).then(function(){
      if ( isNaN(search) ) {
        $('#modal_search_client').modal();
        $scope.clients = Clients.clients;
      } else {
        $scope.search = '';
        $scope.client = Clients.clients[0];
      }
    });
  };

  $scope.client_sel = function(client){
    $('#modal_search_client').modal('hide');
    $scope.search = '';
    $scope.client = client;
  };

  $scope.searchProduct = function(product){
    if (product.product_id === "") {
      return;
    }

    Factura.search_product(product.product_id).then(function(res){
      Factura.add_detail(res);
      $scope.add.product_id = '';
      $scope.add.amount = 1;
    }, function(err){
      console.error(err);
    });
  };

  $scope.update = function(){
    Factura.recalculate();
  };

  $scope.delete_detail = function(product){
    Factura.delete_detail(product);
  };

  $scope.save_factura = function(){
    Factura.client_id = $scope.client.id;
    Factura.save_factura().then(function(res){
      if (res.err === false) {
        Factura.new_factura();
        $location.path('/facturas/detalle/'+res.facturaid);
      }
    });
  };

  $scope.cancel_factura = function(){
    swal({
      title: "¿Estas seguro?",
      text: "¿Seguro que quieres cancelar la orden?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: true,
      closeOnCancel: true
    },
    function(isConfirm){
      if (isConfirm) {
        $scope.client = {};
        Factura.new_factura();
        $scope.$apply();
      }
    });
  };

}];