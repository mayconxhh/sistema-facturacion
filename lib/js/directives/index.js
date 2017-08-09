// Import of directives
import EnterKey from './enterKey';

export default function(){
  var app = angular.module('facturacionApp');

  // Directive personalizated of aplication
  app.directive('enterKey', EnterKey);
};