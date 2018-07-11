(function() {

    angular.module('haladrive').controller('vfinanceCtrl', function(API_URL, $http, $state, $stateParams, $scope){

        var vm = this;

        $scope.globalLoaded = false;

        vm.id = $stateParams.id;
        vm.nvins = {};
        vm.editmode = null;

        vm.fetchList = function()
        {
            var url = API_URL+'/api/vfinance/'+vm.id;
            $http.get(url).then(
                // success
                function(response){

                vm.dataList = response.data;
                vm.editmode = "showall";
            }, function (response){
                // error
                    vm.dataList = response.data;

                });
        };

        vm.fetchList();

        vm.addNew = function(vehicle_id, finance_id)
        {
                var url = API_URL+'/api/vfinance';
                var data = { vehicle_id: vehicle_id, finance_id: finance_id};
                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.fetchList();
                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    }
                }, function(response) {

                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                });
        };

        vm.linkToggle2 = function(status, id, finance_id)
        {
            var vehicle_id = vm.id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};

            if(id == null)
            {
                console.log('do insert operation');

                vm.addNew(vehicle_id, finance_id);
            }
            else {
                vm.remove(id);
            }

        };


        vm.remove = function(id) {
        var url = API_URL+"/api/vfinance/"+id;
        $http.delete(url)
            .then(
            function(response) {
            if(response.data.status == true)
            {
                vm.fetchList();
            }

            },
            function(response)
            {

            });
        };

    });

})();
