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
        self.userId = '  ';
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {})

        console.log(self.user);

        console.log(self.user.instance);

        function leaveGroup() {
            console.log("leave that shiat");
            self.user.set('ride', null);
            self.user.save();
        }
    }

})();