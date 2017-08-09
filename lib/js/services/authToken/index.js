export default ['$window', function($window){
  var self = {};

  // Save validation in memory
  self.setToken = function(tok){
    if (tok){
      $window.localStorage.setItem('__at', tok);
    } else {
      $window.localStorage.removeItem('__at');
    }
  };

  // Check validation of session of user
  self.getToken = function(){
    return $window.localStorage.getItem('__at');
  }

  return self;
}];