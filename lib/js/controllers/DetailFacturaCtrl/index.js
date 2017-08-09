export default ['$scope', '$routeParams', 'DetailFactura', function($scope, $routeParams, DetailFactura){
	var factura_id = $routeParams.id;

	$scope.factura = {};

	DetailFactura.loadFactura(factura_id).then(function(){
		$scope.factura = DetailFactura;
	});

	$scope.print_factura = function(){
		window.print();
	};
}];