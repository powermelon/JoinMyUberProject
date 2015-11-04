(function () {

    angular
        .module('JMU')
        .controller('myRideController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q',
          myRideController
       ]);
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function myRideController($scope, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q) {
        var self = this;
        self.leaveGroup = leaveGroup;

        // Get the Stamplay user and safe it
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {});

        console.log(self.user);

        function leaveGroup(index) {            
            self.user.instance.userInGroups.splice(index,1);        
            self.user.set('userInGroups', self.user.instance.userInGroups);
            self.user.save();
            console.log(self.user);
        }
    }

})();