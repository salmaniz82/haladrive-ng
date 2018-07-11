(function() {

    angular.module('haladrive').controller('invoiceCtrl', function(API_URL, $http, $scope){

        var vm = this;
        vm.records = false;
        vm.sortType = '$';
        vm.sortReverse = true;
        vm.searchQuery = '';

        vm.fetch = function()
        {

            var url = API_URL+'/api/invoice';
            $http({
                url: url,
                method: 'GET'
            }).then(function(response){
                if(response.data.i !== undefined)
                {
                    vm.dataList = response.data.i;
                    vm.records = true;
                }
                else {

                    vm.records = false;
                }
            });

        };

        vm.fetch();


        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/invoice/'+id;
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




        vm.remove = function (i, id)
        {
            var url = API_URL+"/api/invoice/"+id;


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


    });

})();
