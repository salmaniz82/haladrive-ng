(function() {

    angular.module('haladrive').controller('clientsAddCtrl', function(API_URL, $http, $state, $scope){

        var vm = this;

        console.log('clients add controller activated');

        vm.ncli = {};

        vm.back = function(){

            $state.go('app.cleints');

        };

        vm.addNewClients = function()
        {

            var errors = [];

            if(vm.ncli.nameEN == undefined || vm.ncli.nameEN == "")
            {
                errors.push('Name English Not Provided');
            }

            if(vm.ncli.nameAR == "" || vm.ncli.nameAR ==  undefined)
            {
                errors.push('Name Arabic Not Provided');
            }

            if(vm.ncli.mobile == "" ||  vm.ncli.mobile ==  undefined)
            {
                errors.push('Mobile Not Provided');
            }

            if(vm.ncli.email == "" || vm.ncli.email == undefined)
            {
                errors.push('Email Not Provided');
            }

            console.log('erlen' + errors.length);

            if(errors.length == 0)
            {

                console.log('erlen' + errors.length);

                var url = API_URL+'/api/clients';
                var data = {nameEN: vm.ncli.nameEN, nameAR: vm.ncli.nameAR, mobile: vm.ncli.mobile, mobile2: vm.ncli.mobile2, email: vm.ncli.email, civilno: vm.ncli.civilno};

                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.ncli = {};

                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 3000 //time in ms
                        };

                        $scope.$emit('notify', notify);


                    }

                }, 

                function(response)
                {
                    console.log('error while adding new data');

                    var notify = {
                            type: 'error',
                            title: 'Failed',
                            content: response.data.message,
                            timeout: 3000 //time in ms
                        };

                        $scope.$emit('notify', notify);


                }



                );
            }
            else {
                console.log('Form validation errors');
            }

        };


    });

})();
