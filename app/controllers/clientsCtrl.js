(function() {

    angular.module('haladrive').controller('clientsCtrl', function(API_URL, $http){

        vm = this;

        vm.fetchCleints = function()
        {

            var url = API_URL+'/api/clients';

            $http.get(url).then(function(response){
                vm.clients = response.data;
            });

        };

        vm.fetchCleints();


        vm.check = function(){
            console.log('check if this works or not');
        };

        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/clients/'+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function(response) {

                if(response.data.status == true)
                {
                    console.log('clients status updated with Success');
                }
                else {
                    console.log('failed while updating the status');
                }

            });

        };

        vm.removeClients = function(i, id) {

            var url = API_URL+"/api/clients/"+id;
            $http.delete(url)
                .then(function(response) {
                    response.data;
                    vm.finance.splice(i, 1);
                });

        };


    });

})();
