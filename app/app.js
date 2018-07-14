(function(){
	
    angular.module('haladrive', ['ui.router', 'loadingStatus', 'angularNotify'])
       .constant("API_URL", "http://api.haladrive.local");
   //   .constant("API_URL", "https://api.haladrive.com");
})();



$(document).ready(function() {

    $('select').material_select();

});


/*
$(document).on('load', '.modal', function() {
    $('.modal').modal();
});

$(document).on('click', "a[href='#modal1']", function(e) {
    $('#modal1').modal();
    e.preventDefault();
    console.log('got the click');
});

    */


angular.module('haladrive').run(['$rootScope','$state', function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {

    });


    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
       
      console.log('error cauught');
      e.preventDefault();
      $state.go('app.dashboard');

    });


    





}]);

