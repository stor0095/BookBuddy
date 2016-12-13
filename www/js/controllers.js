angular.module('starter.controllers', ['ngSanitize'])
    .controller('DashCtrl', ['$scope', function ($scope) {
        // Ready for future updates to Home Page
}])

.controller('ChatsCtrl', ['$scope', '$http', 'API', '$stateParams', '$timeout', '$ionicLoading', function ($scope, $http, API, $stateParams, $timeout, $ionicLoading) {
    // Prepare stateParams
    $scope.bookID = $stateParams.bookID;
    $scope.book = {};
    // Instaniate array
    $scope.searchResults = [];
    // Get searchfield input
    var searchField = document.getElementById("inputSearch");
    // When user presses search execute the request
    $scope.bookSearch = function (value) {
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        API.search(value)
            .then(function (res) {
                // Success
                // Hide loading view
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
                $scope.searchResults = res.data.GoodreadsResponse.search.results.work;
                // Reset searchfield
                searchField.value = "";
            }, function (err) {
                // Error handling
                console.log("Error..." + err);
            })
    }
}])

.controller('ChatDetailCtrl', function ($scope, $stateParams, Books, $http) {

    // Prepare stateParams
    $scope.itemid = $stateParams.itemid;
    $scope.item = {};

    // Intialize the DETAILS page
    $scope.init = function (search) {
        Books.book($scope.itemid)
            .then(function (response) {
                // Success
                $scope.items = response.data.GoodreadsResponse.book;


                $scope.author = response.data.GoodreadsResponse.book.authors.author;

            }, function (response) {
                // Error
                console.log(response);
            })
    }

})

.controller('AccountCtrl', function ($scope, Events, $http, $filter, $stateParams, $timeout, $ionicLoading) {

    // Setup the loader
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.itemid = $stateParams.itemid;
    // On page load, display event in Canada
    $scope.init = function () {
        Events.event($scope.itemid).then(function (res) {
            // Hide loader
            $timeout(function () {
                $ionicLoading.hide();
            }, 2000);

            $scope.events = res.data.GoodreadsResponse.events.event;

            $scope.dateEvent = [];

            // Options to filter through events list
            $scope.options = [
                {
                    label: 'Upcoming Events',
                    value: 'start_at.__text'
                        },
                {
                    label: 'City',
                    value: 'city'
                        }
                    ];
        }, function (res) {
            // Error
            console.log("Errpr" + res);
        })
    }
});