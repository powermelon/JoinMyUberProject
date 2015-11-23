(function () {

    angular
        .module('JMU')
        .controller('GroupController', ['$scope', '$sce', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q', 'rideService',
          GroupController
       ]);

    function GroupController($scope, $sce, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q, rideService) {

        var self = this;
        var stamplayRide = null;

        self.showJoinGroupForm = showJoinGroupForm;
        self.buildLink = buildLink;


        //Das hier noch fixen - bei jeder controller instanzierung werden daten abgerufen

        rideService
            .loadAllRides()
            .then(function (rides) {
              
                self.rideCollection = rides;
            });



        self.currentRideInstance = new $stamplay.Cobject('ride').Model;

        // Get the Stamplay user and safe it
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {
                self.user.get('displayName');
                self.user.get('_id');
            })

        $scope.checkIfMember = function (currentMemberId, currentRideId) {

            if (currentMemberId === currentRideId) {
                return true;
            }
        };

        $scope.showJoinButton = function (currentMemeberId, Memebers) {
            var show;
            Memebers.forEach(function (entry) {
                if (entry === currentMemeberId) {
                    show = false;
                } else {
                    show = true;
                }
            });
            return show;
        }

        function showJoinGroupForm(ev, rideIndex) {
            $mdDialog.show({
                    controller: DialogController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/group/GroupJoinDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: {
                        group: self.rideCollection,
                        user: self.user,
                        index: rideIndex
                    },
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        }

        function buildLink(ride) {
            var mapLink = "https://www.google.com/maps/embed/v1/search?q=" + ride.instance.from +
                "&key=AIzaSyDOXFBYRfYyrboDi8Y5DJQff3gLh8mgjbY";
            var iFrame = "<iframe width='350' height='200' style='float:left; padding-right:20px;'  frameborder='0' style='border:0' src='" + mapLink + "' allowfullscreen />";
         
            return $sce.trustAsHtml(iFrame);

        };


        function DialogController($scope, $mdDialog, group, user, index) {
            $scope.rideInstance = group.instance[index];
            $scope.group = group;
            $scope.user = user;
            $scope.index = index;
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();

            };
            $scope.answer = function (answer) {
                if (answer == "join") {

                    //Push RideID to User.instance.UserInGroups

                    if (!($scope.user.instance.userInGroups)) {
                        console.log("user is in no group");

                        var rideInstance = [];
                        rideInstance[0] = $scope.group.instance[$scope.index].instance.id;
                        console.log("adding this to userInGroups");
                        console.log(rideInstance);
                        $scope.user.set('userInGroups', rideInstance);

                    } else {
                        $scope.user.instance.userInGroups.
                        push($scope.group.instance[$scope.index].instance.id);
                    }

                    //Push RideId to Ride.instance.member
                    self.currentRideInstance.fetch($scope.group.instance[$scope.index].instance._id).
                    then(function () {
                        console.log("pushing userID:");

                        self.user.currentUser()
                            .then(function () {
                                console.log(self.user.instance.id);
                                self.currentRideInstance.instance.member.push(self.user.instance.id);

                                console.log("current Ride Instance:");
                                console.log(self.currentRideInstance);
                                self.currentRideInstance.save().then(function () {
                                    window.location.href = "index.html#/myRide";
                                });

                            })
                    });

                    $scope.user.save();

                }


                $mdDialog.hide(answer);
            };

        }


    }









})();