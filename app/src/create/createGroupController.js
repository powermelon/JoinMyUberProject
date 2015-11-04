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

        console.log(self.user);
        console.log(self.ride);

        function createGroup() {
            console.log(self.user.instance);
            self.ride.set('admin_id', self.user.instance.id);
            self.ride.set('admin_name', self.user.instance.displayName);
            self.ride.set('from', $scope.from);
            self.ride.set('to', $scope.to);
            
            self.ride.save();
            
            self.user.set('ride', self.ride.instance);
            self.user.save();
            

        }


    }

})();