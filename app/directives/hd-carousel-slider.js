
    angular.module('haladrive')

    .directive('hdCarouselSlider', function() {

        return {

            restrict: 'A',
            transclude: false,
            link: function(scope, ele, attr, ngModel)
            {
                setTimeout(function(){

                    ele.carousel({
                        fullWidth: true,
                        indicators: true
                    });
                    
              
                }, 100);
                

            }

        };

    });






