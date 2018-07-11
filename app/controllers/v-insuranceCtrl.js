(function() {

    angular.module('haladrive').controller('vinsuranceCtrl', function(API_URL, $http, $state, $stateParams, $scope){

        var vm = this;

        $scope.globalLoaded = false;

        vm.id = $stateParams.id;
        vm.nvins = {};
        vm.editmode = null;

        vm.fetchList = function()
        {
            var url = API_URL+'/api/vinsurance/'+vm.id;
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


        vm.fetchInsurance = function()
        {
        var url = API_URL+'/api/insurance';
            $http.get(url).then(
                // success
                function(response){
                    //vm.dataList = response.data;
                    vm.globalList = response.data;
                    $scope.globalLoaded = true;
                    console.log('success on global loading');

                },
                // success
                function(response) {
                    console.log(response);
                    console.log('error on global loading');
                });

        };



        vm.fetchList();
        vm.fetchInsurance();


        vm.addNew = function()
        {

            var errors = [];
                console.log('erlen' + errors.length);

                var url = API_URL+'/api/vinsurance';
                var data = {
                    ins_id: vm.nvins.ins_id,
                    vehicle_id: vm.id,
                    insuredName: vm.nvins.insuredName,
                    nationality: vm.nvins.nationality,
                    registration: vm.nvins.registration,
                    expiration: vm.nvins.expiration,
                    policyno: vm.nvins.policyNo,
                    licensepurpose: vm.nvins.licensepurpose
                };

                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.nvins = {};
                        vm.fetchList();
                        vm.cancelMode();
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

        vm.updateStatus = function(status, id)
        {
            var url = API_URL+'/api/insurance/'+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};
            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function(response) {
                if(response.data.status == true)
                {
                   console.log('status updated with Success');
                }
                else {
                   console.log('failed while updating the status');
                }
            });
        };

        vm.remove = function(i, id) {

            var url = API_URL+"/api/vinsurance/"+id;
            $http.delete(url)
                .then(
                    function(response) {
                    if(response.data.status == true)
                    {
                        vm.dataList.vi.splice(i, 1);
                    }
                },
                function(response)
                {

                }
                );

        };

        vm.cancelMode = function()
        {
            vm.editmode = "showall";
            vm.vinsr = {};
            vm.nvins = {};
        };


        vm.edit = function(index)
        {
            vm.editmode = 'showedit';
            /*
            vm.vinsr = vm.dataList.vi[index];
            */

            vm.vinsr = Object.assign({}, vm.dataList.vi[index]);

        };

        vm.update = function()
        {

            var id = vm.vinsr.id;
            var url = API_URL+'/api/vinsurance/'+id;

            var postData = {
                ins_id: vm.vinsr.ins_id,
                insuredName: vm.vinsr.insuredName,
                nationality: vm.vinsr.nationality,
                registration: vm.vinsr.registration,
                expiration: vm.vinsr.expiration,
                policyno: vm.vinsr.policyno,
                licensepurpose: vm.vinsr.licensepurpose
            };

            $http({
                url : url,
                method: 'PUT',
                data : postData
            }).then(function(response){

                if(response.data.status == true)
                {
                    vm.vinsr = {};
                    vm.fetchList();
                    vm.cancelMode();
                }

            });

        };

    });

})();
