(function () {

    angular
        .module('JMU')
        .controller('createGroupController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q',
          createGroupController
       ]);
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function createGroupController($scope, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q) {
        var self = this;
        self.createGroup = createGroup;

        // Get the Stamplay user and safe it
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {});

        self.ride = $stamplay.Cobject('ride').Model;



        function createGroup() {
            self.ride.set('admin_id', self.user.instance.id);
            self.ride.set('admin_name', self.user.instance.displayName);
            self.ride.set('from', $scope.from);
            self.ride.set('to', $scope.to);

            /* 
            var userInstance = [];
            userInstance[0] = self.user.instance;
            self.ride.set('member', userInstance);
            */


            self.ride.save();
            console.log(self.ride);


            if (!(self.user.instance.userInGroups)) {
                console.log("user is in no group");

                var rideInstance = [];
                rideInstance[0] = self.ride.instance;
                self.user.set('userInGroups', rideInstance)
                self.user.save();
            } else {
                /*
                console.log("user is already in a group");
                var rideInstance = [];
                rideInstance[0] = self.ride.instance;
                */
                
                self.user.instance.userInGroups.push(self.ride.instance);
                self.user.save();
                console.log("ok ride should be pushed:");
                console.log(self.user);
            }



        }


    }

})();