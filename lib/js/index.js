// Importing files base for aplication
import angular from 'angular';
import routes from './routes';
import controllers from './controllers';
import services from './services';
import filters from './filters';
import run from './run';
import directives from './directives';

(function (){
  // Required functionality for aplication
  global.jQuery = require('jquery');
  global.$ = require('jquery');
  require('bootstrap');
  require('./utils/adminlte.js');
  require('angular-route');
  require('./utils/jcs-auto-validate.min.js');
  require('./utils/jcs-auto-validate_es-co.json');
  require('./utils/sweetalert.min.js');

  // Declaration of aplication
  var app = angular.module('facturacionApp', ['ngRoute', 'jcs-autoValidate']);
  app.constant('CONFIG', {
    URL: "http://localhost/facturacion/",
    HOMEPATH: "/",
  })

  app.config(routes);
  app.run(run);

  controllers();
  directives();
  services();
  filters();

})();