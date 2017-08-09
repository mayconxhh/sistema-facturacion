export default ['$rootScope', '$location', 'Auth', 'defaultErrorMessageResolver', function ($rootScope, $location, Auth, defaultErrorMessageResolver) {
  // To change the root resource file path
  defaultErrorMessageResolver.setI18nFileRootPath('./public/js/utils');
  defaultErrorMessageResolver.setCulture('es-co');

  $rootScope.$on('$routeChangeStart', function(event, next, current){
    // Validation of session of user
    if (next.$$route.authenticated === true) {
      if (!Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/login');
      }

    } else {
      if (Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/');
      }
    }
  });
}];