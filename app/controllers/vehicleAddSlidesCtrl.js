(function() {

    angular.module('haladrive').controller('vehicleAddSlidesCtrl', function($scope, $stateParams, API_URL){


        var vm = this;

        vm.vehicleID = $stateParams.id;
        vm.uploadUrl = API_URL+'/vehicles/uploadslides/'+vm.vehicleID;

        $scope.dropzoneConfig = {
		    'options': { 
		      'url': vm.uploadUrl
		    },
		    'eventHandlers': {
		      'sending': function (file, xhr, formData) {

		      },
		      'success': function (file, response) {
		        console.log('file is sent');
		      }
		    }
  		};


    });

})();


/*

.controller('dzCtrl', function ($scope) {

  
  $scope.dropzoneConfig = {
    'options': { 
      'url': 'http://api.haladrive.local/uploadslides/69'
    },
    'eventHandlers': {
      'sending': function (file, xhr, formData) {

      },
      'success': function (file, response) {
        console.log('file is sent');
      }
    }
  };
})


*/