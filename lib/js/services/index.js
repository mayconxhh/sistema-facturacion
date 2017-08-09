// Import Services for aplication
import ConfigurationService from './configuration';
import MessagesService from './messages';
import NotificationsService from './notifications';
import ClientsService from './clients';
import LoginService from './login';
import AuthTokenService from './authToken';
import AuthService from './auth';
import AuthInterceptorService from './authInterceptor';
import FacturasService from './facturas';
import DetailFacturaService from './detailFactura';
import FacturaService from './factura';

export default function(){

  var app = angular.module('facturacionApp');
  // Services
  app.factory('Configuration', ConfigurationService);
  app.factory('Messages', MessagesService);
  app.factory('Notifications', NotificationsService);
  app.factory('Clients', ClientsService);
  app.factory('Login', LoginService);
  app.factory('AuthToken', AuthTokenService);
  app.factory('Auth', AuthService);
  app.factory('AuthInterceptor', AuthInterceptorService);
  app.factory('Facturas', FacturasService);
  app.factory('DetailFactura', DetailFacturaService);
  app.factory('Factura', FacturaService);

}