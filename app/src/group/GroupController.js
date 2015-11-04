(function () {

    angular
        .module('JMU')
        .controller('GroupController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q',
          GroupController
       ]);
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function GroupController($scope, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q) {
        var self = this;
        self.showJoinGroupForm = showJoinGroupForm;

        $scope.$on('$routeChangeSuccess', function () {
            self.rideCollection = $stamplay.Cobject('ride').Collection;
            self.rideCollection.select('to').select('from').select('member').select('admin_id').select('admin_name').fetch().then(function () {});
        });

        // Get the Stamplay user and safe it
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {
                self.user.get('displayName');
                self.user.get('_id');
            })

        function showJoinGroupForm(ev, rideInstance) {
            console.log(rideInstance);
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

                    $scope.group.instance.member.push($scope.user.instance._id)
                    $scope.group.set('member', $scope.group.instance.member);
                    $scope.group.save();

                    console.log($scope.user);
                    $scope.user.set('ride', $scope.group.instance);
                    $scope.user.save();

                    window.location.href = "/index.html#/myRide";
                }


                $mdDialog.hide(answer);
            };

        }
    }









})();