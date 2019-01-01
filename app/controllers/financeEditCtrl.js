(function() {

    angular.module('haladrive').controller('financeEditCtrl', function(API_URL, $state, $stateParams, $http, $scope){

        var vm = this;
        var id = $stateParams.id.toString();
        var url = API_URL+'/api/finance/'+id;

        $http({
            url: url,
            method: 'GET'
        }).then(function(response){

            if(response.status == 200)
            {
                vm.fnr = response.data[0];
                console.log(vm.fnr);
            }
            else {
                console.log('cannot load record with this id');
            }

        });




        vm.update = function()
        {


            $http({
                url : url,
                method: 'PUT',
                data : vm.fnr
            }).then(function(response){

                if(response.data.status == true)
                {
                    vm.fnr = {};
                    $state.go('app.finance');
                }

            });

        };


    });



})();
