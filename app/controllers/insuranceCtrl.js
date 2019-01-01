(function() {

    angular.module('haladrive').controller('insuranceCtrl', function(API_URL, $http, $state, $scope){

        var vm = this;

        vm.editmode = false;

        vm.fetchList = function()
        {
            var url = API_URL+'/api/insurance';

            $http.get(url).then(function(response){
                vm.insurance = response.data;

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

            var url = API_URL+"/api/insurance/"+id;
            $http.delete(url)
                .then(function(response) {
                    if(response.data.status == true)
                    {
                        vm.insurance.splice(i, 1);
                    }
                });

        };


        vm.addNew = function()
        {



            var errors = [];

            if(errors.length == 0)
            {

                console.log('erlen' + errors.length);

                var url = API_URL+'/api/insurance';
                var data = {nameEN: vm.nins.nameEN, nameAR: vm.nins.nameAR, mobile: vm.nins.mobile, email: vm.nins.email};

                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.nins = {};
                    }

                });

            }
            else {
                console.log('Form validation errors');
            }

        };


        vm.edit = function(index)
        {
            vm.editmode = true;
            vm.insr = vm.insurance[index];

            console.log(vm.insr);


        };

        vm.update = function()
        {


            var id = vm.insr.id;
            var url = API_URL+'/api/insurance/'+id;

            $http({
                url : url,
                method: 'PUT',
                data : vm.insr
            }).then(function(response){



                if(response.data.status == true)
                {
                    vm.insr = {};
                    vm.editmode = false;
                }

            });

        };




    });

})();
