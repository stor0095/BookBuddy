angular.module('starter.services', [])
    .factory('API', function BookAPIService($http, $stateParams) {

            var url;
            var proxyURL = "http://localhost:8100/";
            var apiKey = "8XP8IlQWVWWJBJ36dCCg";
            var title = title;
            var details = [];
            return {
                search: function (search) {
                        url = proxyURL + "search/index.xml";
                        // Return Goodreads data
                        return $http.get(url, {
                                    params: {
                                        'key': apiKey,
                                        q: search.query,
                                        page: 1,
                                        'search[field]': title
                                    },
                                    // Transform Goodreads XML into JSON 
                                    transformResponse: function (search) {
                                        var x2js = new X2JS({});
                                        var response = angular.bind(x2js, x2js.xml_str2json, search)();
                                        return response;
                                    }
                    });
            }
                
        };
    })
.factory('Books', function BooksFactory($http) {
			// Might use a resource here that returns a JSON array
var url;
var URL = "http://localhost:8100";
var apiKey = "8XP8IlQWVWWJBJ36dCCg";

			// Some fake testing data
			return {
				book: function (itemid) {
					url = URL + "/book/show/" + itemid +".xml";
					return $http.get(url, {
						params: {
							'key': apiKey,
							'id': itemid
						},
						transformResponse: function (search) {
                			var x2js = new X2JS({});
//							$scope.test = value.toString();
                			var response = angular.bind(x2js, x2js.xml_str2json, search)();
                			return response;
							}

					});
				}
			}
})
         
.factory('Events', function EventsFactory($http){
var url;
var URL = "http://localhost:8100";
var apiKey = "8XP8IlQWVWWJBJ36dCCg";
var countryCode = "CA";
    
    return{
        event: function(itemid){
            url = URL + "/event/index.xml"; 
            return $http.get(url, {
                params: {
                    'key': apiKey,
                    'search[country_code]': countryCode
                },
                transformResponse: function(value) {
                            var x2js = new X2JS({});
                			var response = angular.bind(x2js, x2js.xml_str2json, value)();
                			return response;
							}
            });
        }
    }   
})     

         
         
         
         

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
