(function () {
    angular
        .module('JMU')
        .controller('myRideController', ['$scope', '$sce', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q', 'rideService',
          myRideController
       ]);


    function myRideController($scope, $sce, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q, rideService) {
        var self = this;
        self.leaveGroup = leaveGroup;
        self.order = order;
        self.fetchRide = fetchRide;
        self.buildLink = buildLink;

        self.imagePath = "/assets/img/back.png";




        // Get the Stamplay user and safe it
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {
                self.rides = [];

                for (var i in self.user.instance.userInGroups) {
                    var rideID = self.user.instance.userInGroups[i];
                    self.fetchRide(rideID, self.user.instance);

                };

            });

        function fetchRide(rideID, myUserInstance) {
            console.log("call service with:" + rideID);
            rideService
                .loadRide(rideID)
                .then(function (ride) {
                    var rideInstance = ride;
                    console.log(rideInstance);

                    var index = self.rides.push(rideInstance.instance) - 1;

                    console.log(rideInstance.instance.member);
                    for (var i in rideInstance.instance.member) {

                        var userID = rideInstance.instance.member[i];
                        var userInstance = $stamplay.User().Model;
                        console.log("myUser instance:");
                        console.log(myUserInstance);
                        if (userID == myUserInstance.id) {
                            self.rides[index].member.push(myUserInstance);
                        } else {

                            userInstance.fetch(userID).then(function () {
                                self.rides[index].member.push(userInstance.instance);

                            });
                        }

                    }

                    return rideInstance;

                });

            return rideInstance;
        };

        function buildLink(ride) {
            var mapLink = "https://www.google.com/maps/embed/v1/search?q=" + ride.from +
                "&key=AIzaSyDOXFBYRfYyrboDi8Y5DJQff3gLh8mgjbY";
            var iFrame = "<iframe width='350' height='200' style='float:left; padding-right:20px;'  frameborder='0' style='border:0' src='" + mapLink + "' allowfullscreen />";
            console.log("built frame");
            return $sce.trustAsHtml(iFrame);

        };

        function leaveGroup(rideInstance, myUserID) {
            console.log(rideInstance);
            console.log(myUserID);

            for (var i in rideInstance.member) {
                if (rideInstance.member[i] == myUserID) {
                    console.log("member: " + rideInstance.member[i] + " user: " + myUserID);
                    console.log("found at position " + i);
                    self.splicePos = i;

                    var ride = $stamplay.Cobject('ride').Model;
                    ride.fetch(rideInstance.id).then(function () {
                        console.log("splice at position " + self.splicePos);
                        ride.instance.member.splice([self.splicePos], 1);

                        ride.save().then(function () {
                            console.log("saved");
                            console.log(self.ride.instance);
                        });


                    });

                }

            }

            for (var i in self.user.instance.userInGroups) {
                if (self.user.instance.userInGroups[i] == rideInstance.id) {
                    console.log("its about this ride:");
                    console.log(rideInstance);

                    console.log("splice in userInGroups");
                    self.user.instance.userInGroups.splice(i, 1);
                    self.user.save().then(function () {
                        console.log("user updated");
                        window.location.reload();
                    });
                    console.log(self.user.instance);
                }
            };
        }

        function order(ev, ride) {
            console.log("in order function");

            $mdDialog.show({
                    controller: OrderController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/myRide/OrderRideDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: {
                        user: self.user,
                        rideInstance: ride
                    },
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        };

        function OrderController($scope, $mdDialog, user, rideInstance) {
            $scope.user = user;
            console.log("here we are")

            $scope.groupInstance = rideInstance;

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                console.log("join!");

                var dropoff_latitude = "20.675022";
                var dropoff_longitude = "-103.347947";
                var dropoff_address = "Av Juárez 351";

                var pickup_latitude = "20.73995";
                var pickup_longitude = "-103.448053";


                var appURI = "https://m.uber.com/sign-up?" + "client_id=" + "bjGtE1zbpVW4aBj8w-SnMop3a4J-DZs9" +
                    "&dropoff_address=\"" + rideInstance.from + "\"" +
                    "&dropoff_latitude=" + dropoff_latitude +
                    "&dropoff_longitude=" + dropoff_longitude +
                    "&pickup_latitude=" + pickup_latitude +
                    "&pickup_longitude=" + pickup_longitude;

                //window.location.href="http://www.google.de";
                window.location.href = appURI;

                $mdDialog.hide(answer);

            };

        };
    }

})();