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
    $ionicConfigProvider.navBar.alignTitle('center');

    // chart.js
    ChartJsProvider.setOptions({
        //chartColors: ['#4286f4', '#f4a742'],
        responsive: true
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
            'tab-map': {
                templateUrl: 'templates/map-cwr.html',
                controller: 'CwrController'
            }
        }
    })

    .state('tab.map-cwrchart', {
        url: '/map-cwrchart',
        views: {
            'tab-map': {
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
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-land', {
            url: '/map-gmp-land',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-land.html',
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-record', {
            url: '/map-gmp-record',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-record.html',
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-harvest', {
            url: '/map-gmp-harvest',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-harvest.html',
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-chem-use', {
            url: '/map-gmp-chem-use',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-chem-use.html',
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-chem-stor', {
            url: '/map-gmp-chem-stor',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-chem-stor.html',
                    controller: 'GmpQuestionController'
                }
            }
        })
        .state('tab.map-gmp-justify', {
            url: '/map-gmp-justify',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map-gmp-justify.html',
                    controller: 'GmpQuestionController'
                }
            }
        })

    .state('tab.quest', {
        url: '/quest',
        views: {
            'tab-map': {
                templateUrl: 'templates/question.html',
                controller: 'questionController'
            }
        }
    })

    .state('tab.quest-auth', {
        url: '/quest-auth',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-auth.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-info', {
        url: '/quest-info',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-info.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-cost', {
        url: '/quest-cost',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-cost.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-debt', {
        url: '/quest-debt',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-debt.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-agri', {
        url: '/quest-agri',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-agri.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-wat', {
        url: '/quest-wat',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-wat.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-fishery', {
        url: '/quest-fishery',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-fishery.html',
                controller: 'questionMobileController'
            }
        }
    })

    .state('tab.quest-livestock', {
        url: '/quest-livestock',
        views: {
            'tab-map': {
                templateUrl: 'templates/question-livestock.html',
                controller: 'questionMobileController'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/map');

});
