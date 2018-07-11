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


angular.module('haladrive').run(['$rootScope', function ($rootScope) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {

        console.log('$stateChangeStart');

        console.log(fromState.name);
        console.log(toState.name);

    });


    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        console.log('$stateChangeSuccess');

    });

}]);

