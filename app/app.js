(function(){
	
    function apiUrl()
    {
      return (location.hostname == 'app.haladrive.com') ? 'https://api.haladrive.com' : 'http://api.haladrive.local';
    }

    angular.module('haladrive', ['ui.router', 'loadingStatus', 'angularNotify'])
       .constant("API_URL", apiUrl());
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


angular.module('haladrive').run(['$rootScope','$state', '$window', function ($rootScope, $state, $window) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {


    });


    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {



      if($state.current.name != 'app.vehicles') { angular.element($window).unbind('scroll');}


     


    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
       
      
      
      

      if(error == 'Un Authorized')
      {
        $state.go('app.dashboard');
      }

      e.preventDefault();



    });


    





}]);

