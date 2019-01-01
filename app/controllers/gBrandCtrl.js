(function() {

    angular.module('haladrive').controller('gBrandCtrl', function(API_URL, $stateParams, $http, $scope){

        var vm = this;

        vm.mode = 'list';
        vm.records = false;

       vm.id = $stateParams.id;

        vm.fetch = function()
        {

            var url = API_URL+'/api/gbrands/'+vm.id;

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                // success callback
                if(response.status == 200)
                {
                    vm.dataList = response.data;
                    vm.records = true;
                }
            // error callback
            }, function(response) {

                vm.dataList = response.data;
                vm.records = false;

            });

        };

        vm.fetch();

        vm.addNew = function()
        {

            var url = API_URL+'/api/gbrands';
            var id = $stateParams.id;
            var ndata = {'brand_id': id, 'nameEN': vm.ndata.titleEN, 'nameAR': vm.ndata.titleAR};

            $http({
                method: 'POST',
                url:  url,
                data: ndata
            }).then(function(response){

                if(response.data.status == 1)
                {
                    vm.fetch();
                    vm.ndata = {};
                    vm.mode = 'list';
                }

            });

        };

        vm.updateStatus = function(status, id)
        {

            var url = API_URL+"/api/gbrands/"+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function(response) {

                if(response.data.status == true)
                {
                    console.log('updated with Success');
                }
                else {
                    console.log('updating the status');
                }

            });

        };

        vm.remove = function (i, id)
        {
            var url = API_URL+"/api/gbrands/"+id;


            $http.delete(url)
                .then(function(response) {

                    if(response.data.status == true)
                    {
                        vm.dataList.list.splice(i, 1);


                    }
                });

        };

        vm.edit = function(i, id)
        {

            vm.mode = 'edit';
            vm.rdata = vm.dataList.list[i];

        };


        vm.update = function()
        {

            var id = vm.rdata.id;
            var url = API_URL+'/api/gbrands/'+id;

            $http({
                url : url,
                method: 'PUT',
                data : vm.rdata
            }).then(function(response){

                if(response.data.status == true)
                {
                    vm.rdata = {};
                    vm.mode = 'list';
                }
            });

        };


    });

})();
