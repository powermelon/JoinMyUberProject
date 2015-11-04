(function(){
  'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates
  angular.module('JMU', [ 'ngRoute', 'ngMaterial', 'ngStamplay' ])
  .config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/welcome', {
                templateUrl : '/src/welcome/welcome.tmpl.html',
                controller  : 'UserController'
            })
        
            .when('/group', {
                templateUrl : '/src/group/group.tmpl.html',
                controller  : 'GroupController'
            })
            .when('/myRide', {
                templateUrl : '/src/myRide/myRide.tmpl.html',
                controller  : 'myRideController'
            })
         .when('/createGroup', {
                templateUrl : '/src/create/createGroup.tmpl.html',
                controller  : 'createGroupController'
            })
        
        
        
  });
      


})();
