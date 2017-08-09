export default ['AuthToken', function(AuthToken){
	var self = {};

	// Validation of Authentification
	self.request = function(config){
		var token = AuthToken.getToken();
		if (token) {
			config.headers['x-access-token'] = token;
		}
		return config;
	}; 

	return self;
}]