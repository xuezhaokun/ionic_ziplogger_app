angular.module('starter.services', [])

// Users factory to get nearby users
.factory('Users', function($http, $window) {
  return {
    getUsers: function(lat, lon){
      // get current token either null or username
      var token = $window.sessionStorage.getItem('token');
      // server side url (should be changed based on different server)
      var url = "http://localhost:5000/iosServer/getnearby.php?callback=JSON_CALLBACK";
      return $http.jsonp(url,
                {params: { latitude : lat,
                  longitude : lon,
                  token : token
              }});
    }
  }
})

// Signup factory 
.factory('SignUp', function($http) {
  return {
    signUpUser: function(data, lat, lon){
      // server side url (should be changed based on different server)
      var url = "http://localhost:5000/iosServer/checksignup.php";
      return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                },
                data: {
                    username: data.username, 
                    password: data.password,
                    fullname: data.fullname,
                    email: data.email,
                    identity: data.identity,
                    music: data.music,
                    gender: data.gender,
                    zipcode: data.zipcode,
                    latitude: lat,
                    longitude: lon
                }
            });
    }
  }
})

// Login factory
.factory('Login', function($http) {
  return {
    loginUser: function(data, lat, lon){
      // server side url (should be changed based on different server)
      var url = "http://localhost:5000/iosServer/checklogin.php";
      return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                },
                data: {
                    username: data.username, 
                    password: data.password,
                    latitude: lat,
                    longitude: lon
                }
            });
    }
  }
})

// MyYelpAPI factory for getting nearby results from Yelp
.factory("MyYelpAPI", function($http) {
    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
       return result;
    }
    return {
      "retrieveYelp": function(lat, lon, searchTerm) {
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/search?callback=JSON_CALLBACK';
        var location = lat + "," + lon;
        var params = {
          callback: 'angular.callbacks._0',
          ll: location,
          sort: 1,
          oauth_consumer_key: 'Lm4aA_FIpbBPG1QcmcnTGA', //Consumer Key
          oauth_token: '8gp5Fq08_k8krvs7yERlDdlIwBby8DDj', //Token
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
          term: searchTerm
      };
      var consumerSecret = 'wvCpy5LLQ4lpm6jrfhbMZXaoIF0'; //Consumer Secret
      var tokenSecret = 'aZ736qVDP8gOl5GM14QEPG9M0Yk'; //Token Secret
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
      params['oauth_signature'] = signature;
      console.log(url);
      return $http.jsonp(url, {params: params});//.success(callback);
    }
  }
})

// MyMap factory for building the google map
.factory('MyMap', function($http){
    var createMarker = function(latlng, html, map, bounds, info_window) {
        var marker = new google.maps.Marker ({
            map: map, 
            position: latlng
        });
        google.maps.event.addListener(marker, 'click', function() {
            info_window.setContent(html);
            info_window.open(map, marker);
        });
        bounds.extend(latlng);
    }
  return{
    geocodeAddress : function(markers, map, bounds, geocoder, info_window) {
        var address = markers.location.address[0];
        var city = markers.location.city;
        var address_google_map = address + ', ' + city;
        var picture = '<img src ="' + markers.image_url + '" />';
        var rating = '<img src ="' + markers.rating_img_url + '" />';
        var name = '<b>' + markers.name + '</b>';

        var categories_array = markers.categories;
        var categories = '';

        for (var c = 0; c < categories_array.length; c++ ) {
                categories += categories_array[c][1] + ',';
        }

        var info_text = name + '<br />' + categories + '<br />' + rating + '<br />' + address + '<br />' + city + '<br />' + picture;
        
        geocoder.geocode ({'address': address_google_map}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                createMarker(results[0].geometry.location, info_text, map, bounds, info_window);
            } else { 
                console.log("geocode of "+ address +" failed:"+status);
            }
        });
    }

  }

});