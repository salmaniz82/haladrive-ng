(function(){
	angular.module('haladrive')
	.controller('authAppCtrl', function($state, auth, $scope, API_URL, $http){

		vm = this;

		vm.auMessage = "This message is delivered from authAppCtrl"; 
		$scope.actNewBooking = false;
		vm.activateNewBooking = false;
		vm.newBookingId = null;

        vm.newBookingDetails = null;

        if(! auth.isLoggedIn() )
		{
			$state.go('ua.login');
		}
		

		var allowedRoles = [1,3];
		var roleID = auth.getUser().role_id;
		roleID = parseInt(roleID);


		if( ( auth.isLoggedIn() ) && ( roleID !== 1 && roleID !== 3) )
		{
			$state.go('app.logout');
		}

        vm.fetchNewBooking = function(id)
        {

            var bookingSingleUrl = API_URL+'/api/booking/'+id;


            $http({
                url: bookingSingleUrl,
                method: 'GET'
            }).then(function(response){

                // success callback
                if(response.status == 200)
                {
                    vm.newBookingDetails = response.data[0];

                    console.log(vm.newBookingDetails);

                    vm.activateNewBooking = true;
                    $scope.actNewBooking = true;



                    var notify = {
                            type: 'info',
                            title: 'New Booking Notification',
                            content: vm.newBookingDetails.makerEN +':'+ vm.newBookingDetails.modelEN + '<br>@:'+ vm.newBookingDetails.startdatetime +'<br>Client:'+ vm.newBookingDetails.clentNameEN,
                            timeout: 8000 //time in ms
                        };
                       $scope.$emit('notify', notify);                      

                       if($state.current.name == 'app.bookings')
                       {
                            $scope.$apply(); 
                       }

                }
            // error callback
            }, function(response) {

                console.log('failed loading a new booking data');

            });

        };



		vm.newBookingWatch = function()
        {

            console.log('SSE Watch activated');

            if (!!window.EventSource) {


                var EvenSourceUrl;

                if(auth.getUser().role_id == "3")
                {
                    EvenSourceUrl = API_URL+'/channel-new-booking.php?user_id='+auth.getUser().id;
                }
                else {
                    EvenSourceUrl = API_URL+'/channel-new-booking.php';
                }



            var source = new EventSource(EvenSourceUrl, {withCredentials: true});
            } else {
                alert("Your browser does not support Server-sent events! Please upgrade it!");
            }

            var oldValue;

            source.addEventListener("message", function(e) {

            
             var data = JSON.parse(e.data);
             var eventId = parseInt(e.lastEventId);

             if(oldValue == undefined || oldValue != data['totalBookings'])
             {

                if(eventId > 0 && data['totalBookings'] > oldValue) 
                {

                 vm.newBookingId = data.lastBookingId;

                 vm.fetchNewBooking(vm.newBookingId);

                 

                }

                oldValue = data['totalBookings'];
             }

        }, false);

            source.addEventListener("open", function(e) {
                console.log("Connection was opened.");
            }, false);

            source.addEventListener("error", function(e) {
                console.log("Error - connection was lost.");
            }, false);

        };

        if(auth.isLoggedIn())
		{
			vm.newBookingWatch();
		}


	});

})();