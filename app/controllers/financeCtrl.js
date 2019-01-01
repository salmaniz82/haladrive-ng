(function() {

    angular.module('haladrive').controller('financeCtrl', function(API_URL, $http, $scope){

        var vm = this;

        vm.fetchFianace = function()
        {
            var url = API_URL+'/api/finance';

            $http.get(url).then(function(response){
                vm.finance = response.data;



            });
        };

        vm.fetchFianace();

        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/finance/'+id;
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

            var url = API_URL+"/api/finance/"+id;
            $http.delete(url)
                .then(function(response) {
                    if(response.data.status == true)
                    {
                        vm.finance.splice(i, 1);
                    }

                });

        };


    });

})();
