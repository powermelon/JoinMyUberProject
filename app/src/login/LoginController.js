(function () {

    angular
        .module('JMU')
        .controller('LoginController', ['$scope', '$stamplay',
            '$mdSidenav', '$mdDialog', '$mdToast', '$mdBottomSheet', '$log', '$q', 'myUserService',
          LoginController
       ]);

    function LoginController($scope, $stamplay, $mdSidenav, $mdDialog, $mdToast, $mdBottomSheet, $log, $q, myUserService) {
        var self = this;

        self.user = myUserService.getUser()


        self.myUser;
        self.showLoginForm = showLoginForm;
        self.showLogoutForm = showLogoutForm;
        self.login = login;

        $scope.status = '  ';

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

            var user = myUserService.loginUser(email, password);

            if (user.instance) {
                $mdToast.show($mdToast.simple()
                    .content('Welcome to JMU')
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
            } else {
                $mdToast.show($mdToast.simple()
                    .content("couldn't log you in, try again")
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
            }
            /*
            self.user.login(email, password).then(function () {
                console.log("successfully logged in!");
                $mdToast.show($mdToast.simple()
                    .content('Welcome to JMU - ' + self.user.instance.displayName)
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
                
            }, function (err) {
                console.log("nope");
                $mdToast.show($mdToast.simple()
                    .content("couldn't log you in, try again")
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
            });
            */
        }

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();

            };
            $scope.answer = function (answer) {
                if (answer === "login") {
                    if ($scope.email && $scope.password) {
                        login($scope.email, $scope.password);
                        $mdDialog.hide(answer);
                    }
                }

                if (answer === "logout") {

                    $mdToast.show(
                        $mdToast.simple()
                        .content('See you soon! - ' + self.user.instance.displayName)
                        .position(getToastPosition())
                        .hideDelay(3000)
                    );
                    self.user.logout();
                }

            };

        }

        //SHOW 
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

    }

})();