(function () {
    'use strict';
    angular.module('JMU')
        .service('rideService', ['$q', '$stamplay', RideService]);

    function RideService($q, $stamplay) {

        var rides = $stamplay.Cobject('ride').Collection;
        var ride = $stamplay.Cobject('ride').Model;

        //return self.rideCollection;

        return {
            loadAllRides: function () {
                rides.select('to')
                    .select('from')
                    .select('admin_id')
                    .select('admin_name')
                    .select('member')
                    .fetch().then(function () {});
                return $q.when(rides);
            },
            loadRide: function (rideID) {
                console.log("fetch: " + rideID);
                ride
                    .fetch(rideID)
                    .then(function () {});
                return $q.when(ride);
            }

        }
    }

})();