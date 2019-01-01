(function() {

    angular.module('haladrive').controller('gSectionCtrl', function(API_URL, $stateParams, $http, $scope){

        var vm = this;

        vm.mode = 'list';

       vm.section = $stateParams.section;


        vm.fetch = function()
        {

            var url = API_URL+'/api/gsection/slug/'+vm.section;

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

            if(response.status == 200)
            {
                vm.dataList = response.data;
            }
            else {

            }

            });

        };

        vm.fetch();

        vm.addNew = function()
        {


            var url = API_URL+'/api/gsection';

            var g_slug = $stateParams.section;

            var ndata = {'titleEN': vm.ndata.titleEN, 'titleAR': vm.ndata.titleAR, g_slug: g_slug};

            $http({
                method: 'POST',
                url:  url,
                data: ndata
            }).then(function(response){

                if(response.data.status == 1)
                {


                    if(vm.dataList != undefined)
                    {
                        var lastID = response.data.lastID;
                        vm.ndata.id = lastID;
                        vm.ndata.status = "1";
                        vm.dataList.push(vm.ndata);


                    }

                    else {
                       vm.fetch();

                    }


                    vm.ndata = {};
                    vm.mode = 'list';

                }


            });



        };


        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/gsection/'+id;
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
            var url = API_URL+"/api/gsection/"+id;


            $http.delete(url)
                .then(function(response) {

                    if(response.data.status == true)
                    {
                        vm.dataList.splice(i, 1);
                    }
                });

        };

        vm.edit = function(i, id)
        {

            vm.mode = 'edit';
            vm.rdata = vm.dataList[i];

        };


        vm.update = function()
        {

            var id = vm.rdata.id;
            var url = API_URL+'/api/gsection/'+id;

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
