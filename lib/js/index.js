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
    URL: "http://ec2-13-56-188-174.us-west-1.compute.amazonaws.com"
  });

  app.config(routes);
  app.run(run);

  controllers();
  directives();
  services();
  filters();

})();