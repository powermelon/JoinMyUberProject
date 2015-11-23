(function () {

    angular
        .module('JMU')
        .controller('SignUpController', ['$scope', '$location', '$stamplay', '$mdDialog',
           '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          SignUpController
       ]);

    function SignUpController($scope, $location, $stamplay, $mdDialog, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        self.showSignUpForm = showSignUpForm;




        function signup(email, name, password) {

            var registrationData = {
                email: email,
                password: password
            };

            console.log(registrationData);
            var newUser = $stamplay.User().Model;
            newUser.signup(registrationData).then(function () {
                console.log("user is registered");
                newUser.set('displayName', name);
                return newUser.save();
            }).then(function () {
                console.log("user is saved successfully");
                console.log(newUser);

                newUser.login(email, password).then(function () {
                    console.log("successfully logged in!");
                    window.location.href = "/index.html#/welcome";

                });
            });
        }


        function showSignUpForm(ev) {
            console.log("show");
            $mdDialog.show({
                    controller: DialogController,
                    constrollerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/src/signUp/SignUpDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {}, function () {});
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();

            };
            $scope.answer = function (answer) {
                console.log("answer");
                if (answer === "signup") {
                    signup($scope.email, $scope.name, $scope.password);
                }

                if (answer === "cancel") {
                    $mdDialog.hide(answer);
                }

                $mdDialog.hide(answer);
            };

        };
    }

})();