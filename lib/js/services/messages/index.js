export default ['$http', '$q', 'CONFIG', function($http, $q, CONFIG){

  var url = CONFIG.URL;

  // Message of user
  var self = {
    messages:  [{
      img: url+'/public/images/user2-160x160.jpg',
      name: 'Maycon Huayapa',
      message: 'Bienvenido a nuestro servicio de facturación',
      date: '5-marzo'
    },
    {
      img: url+'/public/images/user2-160x160.jpg',
      name: 'Maria Soto',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      date: '8-marzo'
    },
    {
      img: url+'/public/images/user2-160x160.jpg',
      name: 'Victor Martinez',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
      date: '15-abril'
    }]
  };

  return self;
}]