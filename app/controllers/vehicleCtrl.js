(function() {

    angular.module('haladrive').controller('vehicleCtrl', function(API_URL, $http, $scope, $window){

        var vm = this;
        vm.records = false;
        vm.sortType = '$';
        vm.sortReverse = true;
        vm.searchQuery = '';


        $scope.mileRange = 10;
        $scope.priceRange = 10;        


        $scope.changeHistory = 1;

        vm.queryString = '?all';
        vm.targetUrl = API_URL+'/api/vehicles/b/'+vm.queryString;

        $scope.filterHeaderItem = [];
        $scope.appliedFilterItem = [];

        $scope.isFetching = false;

        /*

            Theory create an object containing the keys the header of filter items and values to be the value filter with
            manipuate the object items then increament the update counter watch will monitor the changes
            as it see any change it will trigger the http request and then update it back to the list of vehilcles
            as scroll it will monitor the scroll position and will tigger another request to be made    


            prepare the string out of that object then apply to url for filtering


        */

        vm.fetch = function()
        {

            var url = vm.targetUrl;

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                if(response.data.v !== undefined)
                {
                    vm.dataList = response.data.v;
                    vm.records = true;
                    vm.limit = response.data.limit;
                    vm.records = response.data.records;
                    vm.noPages = response.data.noPages;
                    vm.currentPage = response.data.currentPage;

                    console.log(vm.noPages);    

                }
                else {

                    console.log('unable to load data');
                    vm.records = false;

                }

            });

        };
        /* the default loading*/    
        vm.fetch();




        $scope.fetchMore = function() 
        {

            $scope.isFetching = true;

            

            var paginate = '&limit='+parseInt(vm.limit)+'&page='+parseInt(++vm.currentPage);
             

            var filterUrl = API_URL+'/api/vehicles/b/'+vm.queryString + '&minprice='+$scope.priceRange+'&minmileage='+$scope.mileRange+paginate;

            


            $http.get(filterUrl).then(

            function(response) {        

                

                for(var i=0; i <= response.data.v.length-1; i++)
                {

                    vm.dataList.push(response.data.v[i]);
                }

                vm.limit = response.data.limit;
                vm.records = response.data.records;
                vm.noPages = response.data.noPages;
                vm.currentPage = response.data.currentPage;

                $scope.isFetching = false;

            }, function(response) {

              //  vm.cars = response.data; 


              console.log('error loading more data');

              $scope.isFetching = false;

            });

        };




        angular.element($window).bind('scroll', function() {

            /*
                $window.scrollY
                window.pageYOffset
                document.documentElement.offsetHeight
                console.log('clientHeight' + document.documentElement.clientHeight);
                console.log('offsetHeight' + document.documentElement.offsetHeight);
                console.log('scrollHeight' + document.documentElement.scrollHeight);
            */

            function isMobile()
            {
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    return true;
                }

                else {
                    return false;
                }
            }
/*

            console.log('clientHeight' + document.documentElement.clientHeight);
            console.log('offsetHeight' + document.documentElement.offsetHeight);
            console.log('scrollHeight' + document.documentElement.scrollHeight);


            console.log('$window.pageYOffset' + $window.pageYOffset);

            */

            

            var YScrollLimit;

            if(!isMobile)
            {
                YScrollLimit = document.documentElement.scrollHeight - document.documentElement.clientHeight;    

              //  console.log('not mobile');
            }
            else {
                YScrollLimit = document.documentElement.scrollHeight - document.documentElement.clientHeight;    

                // console.log('device is mobile');

                YScrollLimit -= 100;


            }

            
          //  console.log('Y limit' + YScrollLimit);

            if($window.pageYOffset >= YScrollLimit)
            {
                

                
                var currentPage = parseInt(vm.currentPage);

                var totalPages = parseInt(vm.noPages);

                if(currentPage <= totalPages-1)
                {
                       

                     if(!$scope.isFetching)
                     {

                        
                        $scope.fetchMore();

                     }
                      
                
                }


                else {
                    console.log('records exhausted in this field');
                }
                

                /*

                console.log('cars Limit' + vm.cars.limit);
                console.log('cars Limit' + vm.cars.records);
                console.log('cars Limit' + vm.cars.noPages);
                console.log('cars Limit' + vm.cars.currentPage);

                */
            }



        });








        /*end vehicle loading and fileriring and scroll */


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
