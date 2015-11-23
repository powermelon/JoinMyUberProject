(function () {
    'use strict';
    angular.module('JMU')
        .service('myUserService', ['$q', '$stamplay', MyUserService]);

    function MyUserService($q, $stamplay) {

        self.user = $stamplay.User().Model;
        this.getUser = function () {

            self.user.currentUser()
                .then(function () {
                    return self.user;
                });
            return self.user;
        }

        this.loginUser = function (email, password) {   
            self.user.login(email, password).then(function () {
                console.log("successfull login");
                return self.user;
            });
            return self.user;
        }

        var contacts = [{
            id: 0,
            'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        }];


        this.list = function () {
            return contacts;
        }
    }



})();