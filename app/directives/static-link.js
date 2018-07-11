(function(){
    angular.module('haladrive')

    .directive('staticLink', function() {

    	vm = this;

    return {

        restrict : 'C',
        link : function(scope, ele, attr, ngModel){

            ele.on('click', function(e) {

            e.preventDefault();

            });
       
            }
    
    };


})

    .directive('dropdownButton', function() {


        vm = this;

    return {

        restrict : 'C',
        link : function(scope, ele, attr, ngModel){

            ele.on('click', function(e) {

            e.preventDefault();

            });

            }

    };


});



})();