(function() {

    angular.module('haladrive').controller('financeAddCtrl', function(API_URL, $http, $state, $scope){

        var vm = this;

        console.log('finance add controller activated');

        vm.fn = {};

        vm.back = function(){

            $state.go('app.cleints');

        };

        vm.addNew = function()
        {

            var errors = [];

            if(errors.length == 0)
            {

                console.log('erlen' + errors.length);

                var url = API_URL+'/api/finance';
                var data = {nameEN: vm.fn.nameEN, nameAR: vm.fn.nameAR, mobile: vm.fn.mobile, email: vm.fn.email};

                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.fn = {};
                    }

                });
            }
            else {
                console.log('Form validation errors');
            }

        };


    });

})();
