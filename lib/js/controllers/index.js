// Import of controllers
import MainCtrl from './MainCtrl';
import ClientsCtrl from './ClientsCtrl';
import LoginCtrl from './LoginCtrl';
import FacturasCtrl from './FacturasCtrl';
import DetailFacturaCtrl from './DetailFacturaCtrl';
import NewFacturaCtrl from './NewFacturaCtrl';

export default function(){

  var app = angular.module('facturacionApp');

  // Controllers of aplication
  app.controller('mainCtrl', MainCtrl);
  app.controller('clientsCtrl', ClientsCtrl);
  app.controller('loginCtrl', LoginCtrl);
  app.controller('facturasCtrl', FacturasCtrl);
  app.controller('detailFacturaCtrl', DetailFacturaCtrl);
  app.controller('newFacturaCtrl', NewFacturaCtrl);

};