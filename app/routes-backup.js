(function(){

    angular.module('haladrive')
    /*
     .run(function($rootScope, $state) {
     $rootScope.$state = $state;
     })
     */

        .config(stateConfig);

    function stateConfig($stateProvider, $urlRouterProvider){

        //$urlRouterProvider.otherwise('/badrequest');
        $stateProvider



            .state('home', {

                url: '',
                /*
                 templateUrl: 'views/default.html',
                 controller : 'homeCtrl'
                 */

                views : {

                    "": {
                        templateUrl: 'views/default.html',
                        controller : 'homeCtrl'
                    },
                    "footer": {

                        templateUrl: 'views/footer.html'

                    }

                }



            })

            .state('ua', {


                url: 'ua',
                templateUrl: 'views/templates/ua.html'
            })


            .state('ua.login', {

                url: 'ua/login',
                templateUrl: 'views/login.html'
            })


            .state('ua.register', {

                url: '/register',
                templateUrl: 'views/register.html'
            })


            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller : 'dashboardCtrl'
            })



        /*

         .state('login', {
         url: '/login',
         templateUrl: 'pages/login.html',
         controller : 'loginCtrl'
         })

         .state('loginTest', {
         url: '/loginTest',
         templateUrl: 'pages/login2.html',
         controller : 'loginTestCtrl as vm'
         })


         .state('signup', {
         url: '/signup',
         templateUrl: 'pages/signup.html',
         controller : 'registerCtrl as vm'
         })

         .state('logout', {
         url: '/logout',
         templateUrl: 'partials/logout.html',
         controller : 'logoutCtrl'
         })
         .state('dashboard', {
         url: '/dashboard',
         templateUrl: 'partials/dashboard.html'
         })
         .state('dashboard.testdir', {
         url: '/testdir',
         templateUrl: 'partials/testdir.html',
         controller : function($scope){
         console.log('testdir');
         $scope.testData = [20,50,60];
         }
         })
         .state('dashboard.main.home', {
         url: '/home',
         templateUrl: 'partials/dash-home.html',
         controller : 'dashHomeCtrl as vm'
         })
         .state('dashboard.main', {
         url: '/main',
         templateUrl: 'partials/dash-main.html'
         })
         .state('dashboard.main.messages', {
         url: '/messages',
         templateUrl: 'partials/messages.html'
         })
         .state('dashboard.main.todos', {
         url: '/todos',
         templateUrl: 'partials/todos.html',
         controller: 'todoCtrl as vm'

         })
         .state('dashboard.tutorials', {
         url: '/tutorials',
         templateUrl: 'partials/tutorials.html'

         })
         .state('dashboard.help', {
         url: '/help',
         templateUrl: 'partials/help.html'
         })
         .state('dashboard.settings', {
         url: '/settings',
         templateUrl: 'partials/settings.html'
         })
         .state('dashboard.notifications', {
         url: '/notifications',
         templateUrl: 'partials/notifications.html'
         })
         .state('dashboard.profile', {
         url: '/profile',
         templateUrl: 'partials/profile.html'
         })

         .state('badrequest', {
         url: '/badrequest',
         templateUrl: 'views/404.html',
         controller : 'notFoundCtrl'
         });

         */


    };

})();



/*
 $(document).on('click', 'button.btn', function(e) {
 console.log('dynamic dom is clickable like this');
 });
 */


