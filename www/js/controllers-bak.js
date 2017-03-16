angular.module('starter.controllers', ['ngMap'])

.factory('myService', function() {
  var mys = {
    someData: ''
  };
  return mys;
})


.controller('MapCtrl', function($scope, NgMap, $http, $state,NewsService) {

    $scope.result1 = null;

    NgMap.getMap().then(function(map) {
      //console.log("getMap");
      $scope.map = map;
    });

    /*$scope.$on('g-places-autocomplete:select', function(event, place) {
      //console.log('new location: ' + JSON.stringify(place));
      $scope.data = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      $scope.map.setCenter(place.geometry.location);
      //console.log($scope.data);
    });

    $scope.$watch('result1', function(newValue, oldValue) {
      //console.log("watch");
      if ($scope.map) {
        //console.log($scope.result1);
      }
    }, true);*/

    $scope.centerOnMe = function() {
      if (!$scope.map) {
        return;
      }

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.data = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        console.log($scope.data.lat+'-'+$scope.data.lng);

      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    /*$scope.getMyAddr = function() {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var latlng = pos.coords.latitude + "," + pos.coords.longitude;
        console.log('geolocation: ' + latlng);
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng) // + '&key=XXXXXXXXXX')
          .success(function(data) {
            console.log('geocode: ', data);
            $scope.address = data.results[0].formatted_address;
            if (!$scope.$$phase) $scope.$apply();
          });
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };*/
    

    $scope.news = [
        { title: 'A', imageUrl: '', createdDate: new Date(), content: 'dad dada' }
    ];

  $scope.showDetail = function(newsItem) {
    //consol.log(newsItem);
    NewsService.selectedNews = newsItem;
    $state.go('tab.map-detail');
    //$state.go('tab.map-detail',{title: newsItem.title});
    };

  })

.controller('MapController', function($scope, NgMap, $http, $state, MapService) {

    $scope.getCurrentLocation = function(event){
        $scope.data = {
            title: 'da',
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            createdDate: new Date(),
            content: 'dad dada'
        };
    };

    $scope.result = null;

    NgMap.getMap().then(function(map) {
        //console.log("getMap");
        $scope.map = map;
    });

    $scope.loadLatlon = function(){
      navigator.geolocation.getCurrentPosition(function(pos) {
              //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $scope.data = {
                  title: 'da',
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                  createdDate: new Date(),
                  content: 'dad dada'
              };
              console.log($scope.data.lat + '-' + $scope.data.lng);
          }, function(error) {
              alert('Unable to get location: ' + error.message);
          }); 

    };
          

    /*$scope.news = [
        { title: 'A', imageUrl: '', createdDate: new Date(), content: 'dad dada' }
    ];*/

    $scope.loadNews=function(){

      var mockupNews = [];


      $scope.news = mockupNews;
    };


    $scope.showDetail = function(mapData) {
        //consol.log(newsItem);
        MapService.selectedLocation = mapData;
        $state.go('tab.map-detail');
        //$state.go('tab.map-detail',{title: newsItem.title});
    };

    $scope.loadLatlon();
    $scope.loadNews();

})




.controller('MapDetailCtrl', function($scope, $stateParams,MapService) {
  //$scope.title = $stateParams.title;
  $scope.mapData = MapService.selectedLocation;
})


.controller('DashCtrl', function($scope) {  

})



.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ClientController', function($scope, $http) {

    $scope.sendGetRequest = function() {
        var url = "http://localhost/alrapi/";

        $http.get(url)
            .success(function(data){
                console.log('OK: '+data);
                console.dir(data);
            })
            .error(function(error){
                console.error('error');
            })
    }

    $scope.sendGetRequestNews = function() {
        var url = "http://localhost/alrapi/news";

        $http.get(url)
            .success(function(data){
                console.log('OK: '+data);
                console.dir(data);
            })
            .error(function(error){
                console.error('error');
            })
    }

    $scope.sendGetRequestNewsWithAmount = function(amount) {
        var url = "http://localhost/alrapi/news/amount/"+amount;

        $http.get(url)
            .success(function(data){
                console.log('OK send amount: '+data.newsCount);
                console.dir(data);
            })
            .error(function(error){
                console.error('error');
            })
    }

    $scope.sendPostRequest = function(keyword) {
        var url = "http://localhost/alrapi/news/search/";

        $http.post(url,
                {
                    "keyword": keyword
                }
            )
            .success(function(data){
                console.log('OK send keyword: '+data.searchKeyword);
                console.dir(data);
            })
            .error(function(error){
                console.error('error');
            })
    }

});
