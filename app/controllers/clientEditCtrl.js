(function() {

    angular.module('haladrive').controller('clientEditCtrl', function(API_URL, $state, $stateParams, $http, $scope){

        var vm = this;
        var id = $stateParams.id.toString();
        var url = API_URL+'/api/clients/'+id;

        $http({
            url: url,
            method: 'GET'
        }).then(function(response){

            if(response.status == 200)
            {
                vm.clir = response.data[0];
                console.log(vm.clir);
            }
            else {
                console.log('cannot load record with this id');
            }

        });


        vm.updateClients = function()
        {
            //delete vm.clir.user;

            $http({
                url : url,
                method: 'PUT',
                data : vm.clir
            }).then(function(response){
                console.log(response);
            });

        };


    });

})();
