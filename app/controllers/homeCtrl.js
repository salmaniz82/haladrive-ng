(function(){

	angular.module('haladrive')
	.controller('homeCtrl',	function($state) {
		var vm = this;

		
		$state.go('ua.login');

		
	});



})();