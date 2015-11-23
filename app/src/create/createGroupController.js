(function () {

    angular
        .module('JMU')
        .controller('createGroupController', ['$scope', '$stamplay', 'myUserService',
            '$mdSidenav', '$mdDialog', '$mdToast', '$mdBottomSheet', '$log', '$q',
          createGroupController
       ]);
    var rideID = '  ';
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function createGroupController($scope, $stamplay, myUserService, $mdSidenav, $mdDialog, $mdToast, $mdBottomSheet, $log, $q) {
        var self = this;
        self.createGroup = createGroup;

        // Get the Stamplay user and safe it
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {});

        self.ride = $stamplay.Cobject('ride').Model;

        self.myUser = myUserService.getUser($stamplay)
        console.log(self.myUser);

        function createGroup() {

            self.myUser.currentUser().then(function () {


                self.ride.set('admin_id', self.myUser.instance.id);
                self.ride.set('admin_name', self.myUser.instance.displayName);
                self.ride.set('from', $scope.from);
                self.ride.set('to', $scope.to);
                self.ride.set('member', self.myUser.instance.id);

                self.ride.save().then(function () {
                    console.log("ride: " + self.ride.instance.id + " sucessfully saved");
                    $scope.from = "";
                    $scope.to = "";
                    showSimpleToast();


                    //If user creates first time a ride the userInGroups is not created yet
                    if (!(self.myUser.instance.userInGroups)) {
                        console.log("user is in no group");

                        var rideInstance = [];
                        rideInstance[0] = self.ride.instance.id;
                        self.myUser.set('userInGroups', rideInstance);

                    } else {
                        console.log("Add ride id: " + self.ride.instance.id + " to userInGroups");
                        self.myUser.instance.userInGroups.push(self.ride.instance.id);
                    };
                    
                    self.myUser.save().then(function () {
                        console.log("user: " + self.myUser.instance._id + " sucessfully saved");
                        console.log(self.myUser);

                    }, function (err) {
                        console.log("fail to save user");
                    });
                    console.log(self.ride);
                }, function (err) {
                    console.log("fail to save ride");
                });


            });


            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            self.toastPosition = angular.extend({}, last);

            function getToastPosition() {
                sanitizePosition();
                return Object.keys(self.toastPosition)
                    .filter(function (pos) {
                        return self.toastPosition[pos];
                    })
                    .join(' ');
            };

            function sanitizePosition() {
                var current = self.toastPosition;
                if (current.bottom && last.top) current.top = false;
                if (current.top && last.bottom) current.bottom = false;
                if (current.right && last.left) current.left = false;
                if (current.left && last.right) current.right = false;
                last = angular.extend({}, current);
            }

            function showSimpleToast() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('New group successfull created')
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
            };
        }


    }

})();