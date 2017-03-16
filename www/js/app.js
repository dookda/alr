// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ChartJsProvider) {
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  // chart.js
  ChartJsProvider.setOptions({
      chartColors: ['#4286f4', '#f4a742'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsController'
      }
    }
  })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapController'
      }
    }
  })

  .state('tab.map-detail', {
      url: '/map-detail',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-detail.html',
          controller: 'MapdetailController'
        }
      }
    })

  .state('tab.map-cwr', {
      url: '/map-cwr',
      views: {
        'tab-cwr': {
          templateUrl: 'templates/map-cwr.html',
          controller: 'CwrController'
        }
      }
    })

  .state('tab.map-cwrchart', {
      url: '/map-cwrchart',
      views: {
        'tab-cwr': {
          templateUrl: 'templates/map-cwrchart.html',
          controller: 'CwrchartController'
        }
      }
    })

 .state('tab.map-gmp', {
      url: '/map-gmp',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp.html',
          controller: 'GmpController'
        }
      }
    })

  .state('tab.map-gmp-water', {
      url: '/map-gmp-water',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-water.html',
          controller: 'GmpWaterController'
        }
      }
    })
  .state('tab.map-gmp-land', {
      url: '/map-gmp-land',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-land.html',
          controller: 'GmpLandController'
        }
      }
    })
  .state('tab.map-gmp-record', {
      url: '/map-gmp-record',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-record.html',
          controller: 'GmpRecordController'
        }
      }
    })
  .state('tab.map-gmp-harvest', {
      url: '/map-gmp-harvest',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-harvest.html',
          controller: 'GmpHarvestController'
        }
      }
    })
  .state('tab.map-gmp-chem-use', {
      url: '/map-gmp-chem-use',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-chem-use.html',
          controller: 'GmpChemUseController'
        }
      }
    })
  .state('tab.map-gmp-chem-stor', {
      url: '/map-gmp-chem-stor',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-chem-stor.html',
          controller: 'GmpChemStorController'
        }
      }
    })
  .state('tab.map-gmp-justify', {
      url: '/map-gmp-justify',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-gmp-justify.html',
          controller: 'GmpJustifyController'
        }
      }
    })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');

});
