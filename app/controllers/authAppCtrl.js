(function(){
	angular.module('haladrive')
	.controller('authAppCtrl', function($state, auth){

		vm = this;

		if(!auth.isLoggedIn())
		{
			$state.go('ua.login');
		}




	});

})();