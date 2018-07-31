(function() {

    angular.module('haladrive').controller('vehicleEditCtrl', function(API_URL, $http, $scope, $state, $stateParams){

        var vm = this;
        $scope.globalLoaded = false;
        vm.records = false;
        var id = $stateParams.id;
        this.count = 0;




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

        vm.fetchRecord = function()
        {

            var url = API_URL+'/api/vehicles/'+id;

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                if(response.data.v !== undefined)
                {
                    vm.dataList = response.data.v[0];
                    vm.records = true;

                    vm.dataList.owner = parseInt(vm.dataList.owner);
                    vm.dataList.nokeys = parseInt(vm.dataList.nokeys);
                    vm.dataList.accident_damage = parseInt(vm.dataList.accident_damage);

                    console.log(vm.dataList);
                    
                }
                else {
                    console.log('unable to load data');
                    vm.records = false;
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
            console.log('selected destroyed and build');


        };


        vm.buildRange = function(s, e = null)
        {
			var t = e || (new Date()).getFullYear();

			result = [];
			for(i=s; i <= t; i++){
				result.push(i);
			}
			return result;
		};


		vm.yearRange = vm.buildRange(2013);

/*

        setTimeout(function() {


            $scope.$apply(function() {


                vm.checkTrue = function (itemId) {

                    vm.checkStatus = false;


                    Object.keys(vm.dataList.options).forEach(function(key, val) {

                        if(vm.dataList.options[key].options_id == itemId)
                        {
                            vm.checkStatus = true;
                        }
                        

                    });


                    return vm.checkStatus;

                };

            });

            

        }, 1000);
*/


        $scope.$watch('vm.records', function(newValue, oldValue, scope) {


            if(newValue !== oldValue)
            {
               
                vm.checkTrue = function (itemId) {

                    vm.checkStatus = false;

                    Object.keys(vm.dataList.options).forEach(function(key, val) {

                        if(vm.dataList.options[key].options_id == itemId)
                        {
                            vm.checkStatus = true;
                        }
                        
                    });

                    return vm.checkStatus;

                };

            }

        });


    });


})();




