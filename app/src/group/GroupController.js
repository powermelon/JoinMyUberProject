(function () {

    angular
        .module('JMU')
        .controller('GroupController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q',
          GroupController
       ]);
    /*
        .factory('StamplayService', function () {

            var getData = {
                set: function (collection) {
                    collection.select('to').select('from')
                        .select('member')
                        .select('admin_id')
                        .select('admin_name')
                        .fetch().then(function () {});
                    return collection;
                }
            }


    return getData;
});
*/
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */

    function GroupController($scope, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q) {
        console.log("gc function called");

        var self = this;
        self.rideCollection = null;
        var stamplayRide = null;

        self.showJoinGroupForm = showJoinGroupForm;

        stamplayRide = $stamplay.Cobject('ride').Collection;
        stamplayRide.select('to')
            .select('from')
            .select('member')
            .select('admin_id')
            .select('admin_name')
            .fetch().then(function () {});

        self.rideCollection = stamplayRide;

        // Get the Stamplay user and safe it
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {
                self.user.get('displayName');
                self.user.get('_id');
            })

        function showJoinGroupForm(ev, rideInstance) {
            $mdDialog.show({
                    controller: DialogController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/group/GroupJoinDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: {
                        group: rideInstance,
                        user: self.user
                    },
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        }
        
        console.log(self.rideCollection);

        function DialogController($scope, $mdDialog, group, user) {
            $scope.group = group;
            $scope.user = user;
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();

            };
            $scope.answer = function (answer) {
                if (answer == "join") {

                    console.log($scope.group);
                    console.log($scope.user);

                    if (!($scope.user.instance.userInGroups)) {
                        console.log("user is in no group");

                        var rideInstance = [];
                        rideInstance[0] = $scope.group.instance;

                        $scope.user.set('userInGroups', rideInstance);
                        console.log($scope.user.instance.userInGroups);

                        $scope.user.save();
                    } else {
                        console.log("user is already in group:");
                        $scope.user.instance.userInGroups.push($scope.group.instance);
                        $scope.user.save();
                        
                        console.log("ride in userInGroups pushed, new looks like this:");
                        console.log($scope.user.instance.userInGroups);
                    }

                }


                $mdDialog.hide(answer);
            };

        }
    }









})();