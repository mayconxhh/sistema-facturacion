export default ['$http', '$q', function($http, $q){
  // Notification of user
  var self = {
    notifications: [{
      icon: 'fa-user',
      text: 'Nuevo usuario registrado'
    },
    {
      icon: 'fa-save',
      text: 'Se ha usado el 50% de disco duro'
    }]
  };

  return self;
}]