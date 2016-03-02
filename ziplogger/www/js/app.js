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
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($sceProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    
    .state('app', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'HeaderCtrl'
    })
    // Each tab has its own nav history stack:
    

    .state('app.fans', {
      url: '/fans',
      views: {
        'tab-fans': {
          templateUrl: 'templates/tab-fans.html',
          controller: 'FansCtrl'
        }
      }
    })

    .state('app.artists', {
      url: '/artists',
      views: {
        'tab-artists': {
          templateUrl: 'templates/tab-artists.html',
          controller: 'ArtistsCtrl'
        }
      }
    })
    .state('app.venues', {
      url: '/venues',
      views: {
        'tab-venues': {
          templateUrl: 'templates/tab-venues.html',
          controller: 'VenuesCtrl'
        }
      }
    })    

    .state('app.stores', {
      url: '/stores',
      views: {
        'tab-stores': {
          templateUrl: 'templates/tab-stores.html',
          controller: 'StoresCtrl'
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/fans');
  $sceProvider.enabled(true);

});

