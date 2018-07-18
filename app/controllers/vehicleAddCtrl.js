(function() {

    angular.module('haladrive').controller('vehicleAddCtrl', function(API_URL, $http, $scope, $state){

        var vm = this;
        $scope.globalLoaded = false;

        vm.fetchGlobal = function()
        {
            var url = API_URL+'/api/gval';
            $http({
                url: url,
                method: 'GET'
            }).then(function(response){
                if(response.status == 200)
                {
                    vm.globalList = response.data;
                    console.log('loaded in controller');
                    $scope.globalLoaded = true;
                }
                else {
                    console.log('cannot load record with this id');
                }
            });

        };

        vm.checkfile = function()
        {

                var file = $scope.photo;
                var uploadUrl = API_URL + '/api/vehicles';

                var form_data = new FormData();
                angular.forEach(file, function(file){
                    form_data.append('file', file);
                });


                if(vm.nc != undefined)
                {
                    vm.ncpost = angular.copy(vm.nc);
                    vm.ncpost.options = vm.filterOptions(vm.ncpost.options);

                    var formpostdata = vm.ncpost;

                    for (var key in formpostdata) {
                        form_data.append(key, formpostdata[key]);
                    }

                    var addSuccess = function(response) {
                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                        console.log('ready to move');

                        $state.go('app.vslide', {'id': response.data.last_id});

                    };


                    var addError = function(response)
                    {
                        var notify = {
                            type: 'error',
                            title: 'Got errors while adding new record!',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);


                    };

                    $http.post(uploadUrl, form_data,
                        {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined,'Process-Data': false}
                        }).then(addSuccess, addError);

                } else {
                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: 'Please Enter Required Field',
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                }

        };


        vm.addNew = function() {

            var url = API_URL + '/api/vehicles/d';


             var addSuccess = function(response) {
                 var notify = {
                     type: 'success',
                     title: 'Success',
                     content: response.data.message,
                     timeout: 5000 //time in ms
                 };
                 $scope.$emit('notify', notify);


             };


            var addError = function(response)
            {
                var notify = {
                    type: 'error',
                    title: 'Got errors while adding new record!',
                    content: response.data.message,
                    timeout: 5000 //time in ms
                };
                $scope.$emit('notify', notify);
            };

            if(vm.nc !== undefined)
            {
                vm.ncpost = angular.copy(vm.nc);
                vm.ncpost.options = vm.filterOptions(vm.ncpost.options);

                $http({
                    method: 'POST',
                    url:  url,
                    data: vm.ncpost
                }).then(addSuccess, addError);
            }
            else {
                var notify = {
                    type: 'error',
                    title: 'Error',
                    content: 'Please Enter Required Field',
                    timeout: 3000 //time in ms
                };
                $scope.$emit('notify', notify);
            }
        };

        vm.filterOptions = function(myObj)
        {
            if(myObj !== undefined)
            {
                var result = Object.keys(myObj).filter(function(x) {
                    return myObj[x] !== false;
                });
                return result;
            }
            else {
                return null;
            }
        };


        vm.udpateModelList = function()
        {
            var myElement = angular.element( document.querySelector( '#selTar' ) );
            myElement.material_select('destroy');

            setTimeout(function() {
                myElement.material_select();
            }, 500);

            myElement.material_select();
            console.log('destroyed');


        };

    });

})();
