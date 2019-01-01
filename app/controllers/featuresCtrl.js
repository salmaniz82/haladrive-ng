(function(){
	angular.module('haladrive')

	.controller('featuresCtrl', function ($http, API_URL, $scope){

		var vm = this;
		vm.editmode = false;


        vm.sortType     = 'id'; // set the default sort type
        vm.sortReverse  = false;  // set the default sort order
        vm.searchQuery   = '';     // set the default search/filter term


		vm.fetchallFeature = function()
		{
			var url = API_URL+"/features";

            $http.get(url)
                .then(function(response) {
                 vm.features = response.data;
            });
		};
		vm.fetchallFeature();
		vm.updateFeature = function(status, id)
		{
			
			var url = API_URL+'/features/'+id;
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
					var notify = {
					    type: 'success',
					    title: 'Success',
					    content: response.data.message,
					    timeout: 5000 //time in ms
					};
					$scope.$emit('notify', notify);
				}

			});

		};

        vm.findIndex = function findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        };

        vm.getIndex = function(prop, val)
		{

			var index = vm.findIndex(vm.features, prop, val);

			return index;

		};


		vm.addFeature = function()
		{
			
			var errors = [];

			if(errors.length == 0)
			{

				// prepare post object to push to the server
				var newFeature = {id: null, "featureEN": vm.frio.en, 'featureAR': vm.frio.ar, "status": true};


                var url = API_URL+'/features';
                $http({
                    method: 'POST',
                    url:  url,
                    data: newFeature
                }).then(function(response){
                    if(response.data.status == 1)
                    {
                        vm.frio = {};
                        vm.fetchallFeature();


					}
                });
            }
			else {
				console.log(errors);
			}
		};


		vm.removeFeature = function (id)
		{

			var i = vm.getIndex('id', id);

            var url = API_URL+"/features/"+id;
            $http.delete(url)
                .then(function(response) {
                   response.data;
                    vm.features.splice(i, 1);
                });
		};

		vm.edit = function(prop, val)
		{
			var index = vm.getIndex(prop, val);
			vm.editmode = true;
			vm.fED = vm.features[index];
		};

		vm.update = function()
		{
            var id = vm.fED.id;
			var url = API_URL+'/features/'+id;
            var data = {featureEN: vm.fED.featureEN, featureAR: vm.fED.featureAR};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function(response) {

                if(response.data.status == true)
                {
                    vm.editmode = false;
                    vm.fED = null;
                }

            });

		};

	});

})();