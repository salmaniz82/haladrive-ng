(function() {

    angular.module('haladrive').controller('globalCtrl', function(API_URL, $http){

        var vm = this;



        vm.mode = 'list';

        vm.fetch = function()
        {

            var url = API_URL+'/api/global';

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                if(response.status == 200)
                {

                    vm.dataList = response.data;

                }


            }, function(response){

                vm.dataList = response.data;


            });

        };

        vm.fetch();


        vm.updateStatus = function(status, id)
        {

            var url = API_URL+'/api/global/'+id;
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

        vm.addNew = function()
        {


            var url = API_URL+'/api/global';

            var slug = vm.slugify(vm.ndata.titleEN);

            var ndata = {'titleEN': vm.ndata.titleEN, 'titleAR': vm.ndata.titleAR, slug: slug, status: true  };

            $http({
                method: 'POST',
                url:  url,
                data: ndata
            }).then(function(response){
                if(response.data.status == 1)
                {
                    console.log(response.data);

                    var lastID = response.data.lastID;
                    vm.ndata.id = lastID;
                    vm.ndata.slug = slug;
                    vm.ndata.status = "1";
                    vm.dataList.push(vm.ndata);
                    vm.ndata = {}
                    vm.mode = 'list';
                }
            });

        };

        vm.slugify = function slugify(text)
        {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        };


        vm.remove = function (i, id)
        {
            var url = API_URL+"/api/global/"+id;


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
            var url = API_URL+'/api/global/'+id;

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
