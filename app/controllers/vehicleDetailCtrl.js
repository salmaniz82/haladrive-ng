(function() {

    angular.module('haladrive').controller('vehicleDetailCtrl', function(API_URL, $http, $scope, $stateParams){

        var vm = this;
        vm.records = false;
        vm.sortType = '$';
        vm.sortReverse = true;
        vm.searchQuery = '';

        var id = $stateParams.id;

        vm.fetch = function()
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
                }
                else {
                    console.log('unable to load data');
                    vm.records = false;
                }
            });

        };

        vm.fetch();

        console.log('detail loaded');

    });

})();
