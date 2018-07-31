(function() {

    angular.module('haladrive').controller('vehicleCtrl', function(API_URL, $http, $scope){

        var vm = this;
        vm.records = false;
        vm.sortType = '$';
        vm.sortReverse = true;
        vm.searchQuery = '';

        vm.fetch = function()
        {

            var url = API_URL+'/api/vehicles';

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                if(response.data.v !== undefined)
                {
                    vm.dataList = response.data.v;
                    vm.records = true;

                }
                else {

                    console.log('unable to load data');
                    vm.records = false;

                }

            });

        };

        vm.fetch();


        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/vehicles/'+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(
                function(response)
                {
                    // success callback
                    var notify = {
                        type: 'success',
                        title: 'Success',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                },
                function(response)
                {
                    // error callback
                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                });

        };

        vm.availToggle = function(status, id)
        {

            var url = API_URL+'/api/vehicles/'+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {is_available: cleanStatus};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(
                function(response)
                {
                    // success callback
                    var notify = {
                        type: 'success',
                        title: 'Success',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                },
                function(response)
                {
                    // error callback
                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                });

        };


        vm.remove = function (i, id)
        {
            var url = API_URL+"/api/vehicles/"+id;


            $http.delete(url)
                .then(
                    function(response) {
                    if(response.data.status == true)
                    {
                        // success callback
                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);

                        vm.dataList.splice(i, 1);

                        if(vm.dataList.length == 0)
                        {
                            vm.records = false;
                        }
                    }
                },

                function(response)
                {

                    // errorcallback
                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);

                }

                );

            };


            vm.ndata = {};


            vm.setBookid = function(id)
            {
                vm.ndata.vehicle_id = id;
            };

            vm.createBooking = function()
            {

                var url = API_URL+'/api/booking';

                $http({
                    method: 'post',
                    url: url,
                    data: vm.ndata
                }).then(
                    function(res){
                    // success
                        $('.modal').modal();

                        console.log('success');


                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: res.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);

                    }, function(res){
                    // error

                        console.log('error');

                        var notify = {
                            type: 'error',
                            title: 'Error',
                            content: res.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);

                });

            };


            vm.optionsList = [111,112,115,116,119,120];
            




    });

})();
