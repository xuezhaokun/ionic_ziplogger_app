angular.module('starter.controllers', [])

// controller for login and logout
.controller('HeaderCtrl', function($scope, $window, $sce, $http) {
  $scope.welcome = "";
  $scope.isLoggedIn = function() {
    // use local sessionStorage in Angularjs to set the token for user login
    if($window.sessionStorage.getItem('token')){
      $scope.welcome = "Hi: " + JSON.parse($window.sessionStorage.getItem('token'));
      return true;
    }else{
      return false;
    }
  };
// logout and remove the session token
  $scope.logout = function(){
    $window.sessionStorage.removeItem('token');
  };

})

// controller for fans tab
.controller('FansCtrl', function($scope, $window, $http, Users) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.lat = null;
    $scope.lon = null;
    $scope.results = [];
    $scope.tab = "Fans";
    // get current geolocation
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
          console.log("get geo");
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          console.log($scope.lat);
          console.log($scope.lon);
          // call Users factory to get nearby fans
          Users.getUsers($scope.lat, $scope.lon).success(function(data) {
            $scope.data = data;
            angular.forEach($scope.data, function(data) {
              if(data.role == "Fan" || data.role == "Band"){
                $scope.results.push(data);
              }
            });
          });
        });
    });
})

// controller for Artists tab
.controller('ArtistsCtrl', function($scope, $window, $http, Users) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.lat = null;
    $scope.lon = null;
    $scope.results = [];
    $scope.tab = "Artists";
    // get geolocation
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
          console.log("get geo");
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          console.log($scope.lat);
          console.log($scope.lon);
          // call Users factory to get nearby artists
          Users.getUsers($scope.lat, $scope.lon).success(function(data) {
            $scope.data = data;
            angular.forEach($scope.data, function(data) {
              if(data.role == "Artist"){
                $scope.results.push(data);
              }
            });
          });
        });
    });
})

// controller for venues
.controller('VenuesCtrl', function($scope, $window, $http, MyYelpAPI) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.lat = null;
    $scope.lon = null;
    $scope.results = null;
    $scope.searchTerm = "music+venue";
    // get geolocation
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
          console.log("get geo");
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          console.log($scope.lat);
          console.log($scope.lon);
          // call MyYelpAPI factory to get nearby venues
          MyYelpAPI.retrieveYelp($scope.lat, $scope.lon, $scope.searchTerm).success(function(data) {
              $scope.results = data.businesses;
              angular.forEach($scope.results, function(result) {
                result.distance = parseFloat(result.distance/1600).toFixed(2);
              });
          });
        });
    });
})


// controller for Stores tab
.controller('StoresCtrl', function($scope, $window, $http, MyYelpAPI) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.lat = null;
    $scope.lon = null;
    $scope.results = null;
    $scope.searchTerm = "music+store";
    // get geo location
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          console.log($scope.lat);
          console.log($scope.lon);
          // call MyYelpAPI to get nearby music venues from yelp results
          MyYelpAPI.retrieveYelp($scope.lat, $scope.lon, $scope.searchTerm).success(function(data) {
              $scope.results = data.businesses;
              console.log($scope.results);
              angular.forEach($scope.results, function(result) {
                result.distance = parseFloat(result.distance/1600).toFixed(2);
              });
          });
        });
    });

})

// controller for Map tab
.controller('MapCtrl', function($scope, $window, $http, MyYelpAPI, MyMap) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.lat = null;
    $scope.lon = null;
    $scope.results = null;
    $scope.searchTerm = "music+venue";
    // get geolocation
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
        $scope.position = position;
        $scope.lat = position.coords.latitude;
        $scope.lon = position.coords.longitude;
        console.log($scope.lat);
        console.log($scope.lon);
        // call MyYelpAPI to get nearby music venues
        MyYelpAPI.retrieveYelp($scope.lat, $scope.lon, $scope.searchTerm).success(function(data) {
        // show yelp results on google map
        $scope.bounds = new google.maps.LatLngBounds();
        $scope.geocoder = new google.maps.Geocoder();
        $scope.info_window = new google.maps.InfoWindow();
        $scope.results = data.businesses;

        var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng($scope.lat, $scope.lon),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.addListener ($scope.map, 'click', function () {
          $scope.info_window.close();
        });
        var geocoder = new google.maps.Geocoder();
        for (var i = 0; i < $scope.results.length; i++) {
          MyMap.geocodeAddress($scope.results[i], $scope.map, $scope.bounds, $scope.geocoder, $scope.info_window);
        }
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {$scope.map.fitBounds($scope.bounds);});

      });
    });
  });
})

// controller for UserInfo which is used in signup form
.controller('UserInfo', function($scope) {
	  $scope.roles = ['Fan','Artist','Band','Venue','Store/Company'];
    $scope.genders = ['Male','Female'];
    $scope.musics = ['Pop','Classical','Rock&Roll','Country','Jazz','Blues','Others'];
})

// controller for signup
.controller('SignupCtrl', function($scope, $window, $ionicModal, $timeout, SignUp) {
  // Form data for the login modal
  $scope.signUpData = {};
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {
    console.log('Doing signup', $scope.signUpData);
    $scope.nameRequired = '';
    $scope.emailRequired = '';
    $scope.passwordRequired = '';
    $scope.formError = '';
    if (!$scope.signUpData.username) {
      $scope.formError += ' * Name Required ';
    }
    if (!$scope.signUpData.email) {
      $scope.formError += ' * Email Invalid ';
    }
    if (!$scope.signUpData.password) {
      $scope.formError += ' * Password Required ';
    }
    if($scope.signUpData.password != $scope.signUpData.comfirmPassword){
      $scope.formError += ' * Password Not Match ';
    }

    if($scope.formError != ''){
      return false;
    }else{
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.$apply(function() {
          console.log("get geo");
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          console.log($scope.lat);
          console.log($scope.lon);

          SignUp.signUpUser($scope.signUpData, $scope.lat, $scope.lon).success(function(data){
            //alert("sucess");
            console.log(data);
            if(data == "success"){
              $scope.closeSignup();
            }else if(data == "registered"){
              $scope.serverError = " * User already registered!";
              return false;
            }else if(data == "invalid"){
              $scope.serverError = " * Invalid username or password!";
              return false;
            }
          })
        });
      });
    }
  };
})

// controller for login
.controller('LoginCtrl', function($scope, $window, $ionicModal, $timeout, Login) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginError = '';
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  }; 


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
      
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.$apply(function() {
          $scope.position = position;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;

          Login.loginUser($scope.loginData, $scope.lat, $scope.lon).success(function(data){
            if(data == "success"){
              $scope.username = JSON.stringify($scope.loginData.username);
              $window.sessionStorage.setItem('token', $scope.username);
              $scope.closeLogin();
            }else if(data == "error_wrong"){
              $scope.loginError = " * username or password incorrect! Please Try again";
              return false;
            }
          })
        });
      });
  };
});
