angular.module('starter.controllers', ['ngSanitize'])
    .controller('DashCtrl', ['$scope', function ($scope) {

}])

.controller('ChatsCtrl', ['$scope', '$http', 'API', '$stateParams', '$timeout', '$ionicLoading',  function ($scope, $http, API, $stateParams, $timeout, $ionicLoading) {


    $scope.currentPage = 1,
    $scope.maxSize = 5;
    
    // Prepare stateParams
    $scope.bookID = $stateParams.bookID;
    $scope.book = {};
    // Instaniate array
    $scope.searchResults = [];
    $scope.newArray = [];

    // Get searchfield input
    var searchField = document.getElementById("inputSearch");
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

                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
                // Success
                //  console.log(res);
                $scope.searchResults = res.data.GoodreadsResponse.search.results.work;

                //    console.log($scope.searchResults);

                // console.log(res.data.GoodreadsResponse.search.results.work.each);

                // Reset searchfield
                searchField.value = "";
             //  $scope.$broadcast('scroll.infiniteScrollComplete');
                //id.__text

            }, function (err) {
                // Error handling
                console.log("Error..." + err);
            })
    }
    
//      $scope.$on('$stateChangeSuccess', function() {
//    $scope.bookSearch();
//  });
//    
    
}])

.controller('ChatDetailCtrl', function ($scope, $stateParams, Books, $http) {

    console.log("Chat details...");
    $scope.itemid = $stateParams.itemid;
    $scope.item = {};

    $scope.init = function (search) {
        // console.log("This function...");
        Books.book($scope.itemid)
            .then(function (response) {
                $scope.items = response.data.GoodreadsResponse.book;
                console.log($scope.items);

                $scope.author = response.data.GoodreadsResponse.book.authors.author;

                console.log(response)

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
        $scope.init = function () {
            Events.event($scope.itemid).then(function (res) {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);

                $scope.events = res.data.GoodreadsResponse.events.event;

                $scope.dateEvent = [];
                console.log($scope.events);

                for (var i = 0; i < $scope.events.length; i++) {
                    $scope.dateEvent = res.data.GoodreadsResponse.events.event[i].start_at.__text;
                    // $scope.monthEvent = $scope.dateEvent;
                    console.log($scope.dateEvent);


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

                }


                //  console.log(res);


            }, function (res) {
                //error
            })
        }
    })
    .controller('LoadingCtrl', function ($scope, $ionicLoading) {
        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...',
                duration: 3000
            }).then(function () {
                console.log("The loading indicator is now displayed");
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () {
                console.log("The loading indicator is now hidden");
            });
        };
    });