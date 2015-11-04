(function () {

    angular
        .module('JMU')
        .controller('LoginController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdBottomSheet', '$log', '$q',
          LoginController
       ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function LoginController($scope, $stamplay, $mdSidenav, $mdDialog, $mdBottomSheet, $log, $q) {
        var self = this;
        
        self.user = $stamplay.User().Model;
        self.user.currentUser()
            .then(function () {
            });
         
        self.showLoginForm = showLoginForm;
        self.showLogoutForm = showLogoutForm;
        self.login = login;

        $scope.status = '  ';

        // *********************************
        // Internal methods
        // *********************************

        /**
         * Select the current avatars
         * @param event
         */
        function showLoginForm(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/login/LoginDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        }
        
        function showLogoutForm(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/login/LogoutDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        }

        function login(email, password) {
            self.user.login(email, password).then(function () {
                console.log("successfully logged in!");
                window.location.href = "/index.html";
            });
        }


        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();

            };
            $scope.answer = function (answer) {
                if(answer === "login")
                {
                    login($scope.email, $scope.password);
                }
                
                if (answer === "logout")
                {
                    self.user.logout();
                }
                
                $mdDialog.hide(answer);
            };

        }

    }








})();