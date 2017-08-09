export default ['$scope', 'Facturas', function($scope, Facturas){
  $scope.facturas = {};
  $scope.removeSearch = false;

  // Navigation for page of listed
  $scope.moveTo = function(page){
    Facturas.loadPages(page).then(function(){
      $scope.facturas = Facturas;
    });
  };

  $scope.searchFactura = function(search){
    $scope.removeSearch = true;
    Facturas.searchFacturas(search);
  };

  $scope.removeFilter = function(frmSearch){
    frmSearch.autoValidateFormOptions.resetForm();
    $scope.removeSearch = false;
    $scope.moveTo(1);
  };

  $scope.moveTo(1);
}];