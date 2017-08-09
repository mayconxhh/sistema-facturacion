// Controller Client
export default ['$scope', 'Clients', function($scope, Clients){

  $scope.clients = {};
  $scope.clientSel = {};

  // Navigation for page of listed
  $scope.moveTo = function(page){
    Clients.loadPages(page).then(function(){
      $scope.clients = Clients;
    });
  };

  $scope.moveTo(1);

  // Show modal of edition
  $scope.showModal = function(client){

    angular.copy(client, $scope.clientSel);

    $('#client_modal').modal();

  };

  // save client
  $scope.save = function(client, frmClient ){

    Clients.save(client).then(function(){
      $('#client_modal').modal('hide');
      $scope.clientSel = {};
      frmClient.autoValidateFormOptions.resetForm();
    }, function(err){
      console.err(err);
    });

  }
}];