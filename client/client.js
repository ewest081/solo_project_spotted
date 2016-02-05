/**
 * Created by lizwestberg on 2/1/16.
 */
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Client Requirements
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
var app = angular.module('clientApp', ['ngRoute']);

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              Angular Routes
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
          templateUrl: 'views/home_page.html',
          controller: 'HomeController'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutController'
        })
        .when('/sign_in', {
          templateUrl: 'views/sign_in.html',
          controller: 'SignInController'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        })
        .when('/guest', {
          templateUrl: 'views/guest.html',
          controller: 'GuestController'
        })
        .when('/success', {
          templateUrl: 'views/user_welcome.html',
          controller: 'UserController',
        })
        .when('/fail', {
          templateUrl: 'views/fail.html',
          controller: 'FailController',
        })
        .when('/register_success', {
          templateUrl: 'views/register_success.html',
          controller: 'RegisterSuccessController',
        })
        .when('/edit_profile', {
          templateUrl: 'views/edit_profile.html',
          controller: 'EditProfileController',
        })
        .when('/view_data', {
          templateUrl: 'views/view_data.html',
          controller: 'ViewDataController',
        })
        .when('/new_entry', {
          templateUrl: 'views/new_entry.html',
          controller: 'NewEntryController',
        })
        .when('/entry_success', {
          templateUrl: 'views/entry_success.html',
          controller: 'EntrySuccessController',
        })
        .when('/log_out', {
          templateUrl: 'views/log_out.html',
          controller: 'LogOutController',
        })
        .otherwise({
          redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              App Controllers
//[][][][][][][][][][][][][][][][][][][][][][][][][][]

app.controller('MainController', ['$scope', 'userData', function($scope, userData){
    $scope.notSignedIn = true;
    $scope.signedIn = false;

    changeNavLinks = function(){
      if(userData.currentUser.username !== ''){
        $scope.notSignedIn = false;
        $scope.signedIn = true;
      }else{
        $scope.notSignedIn = true;
        $scope.signedIn = false;
      }
    };
}]);

app.controller('HomeController', ['$scope', 'userData', function($scope, userData){
    $scope.about = false;
    $scope.toggleAbout = function(){
      $scope.about = $scope.about === true ? false: true;
    };
}]);



app.controller('AboutController', ['$scope', function($scope){

}]);



app.controller('SignInController', ['$scope', '$http', '$location', 'userData', function($scope, $http, $location, userData){
  $scope.data = {};

  $scope.submitData = function(){
    $http.post('/', $scope.data).then(function(response){
      userData.setUser($scope.data.username);
      userData.setUserID($scope.data.username);
      $location.path(response.data);
    });
  };

}]);



app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.data = {};

  $scope.registerData = function(){
    $http({
      url: '/api/registerUser',
      method: 'POST',
      params: {username: $scope.data.username,
                password: $scope.data.password,
                first_name: $scope.data.first_name,
                last_name: $scope.data.last_name,
                email: $scope.data.email}
    }).then(function(response){
        $location.path(response.data);
      });
  };

}]);



app.controller('RegisterSuccessController', ['$scope', '$http', function($scope, $http){

}]);


app.controller('GuestController', ['$scope', function($scope){

}]);



app.controller('UserController', ['$scope', 'userData', function($scope, userData){

    $scope.thisUser = userData.currentUser.username;
    $scope.welcome = "Welcome, " + $scope.thisUser + "!";

    $scope.getID = function(){
      console.log('User id: ', userData.currentUser.id);
    };
}]);



app.controller('EditProfileController', ['$scope', 'userData', function($scope, userData){

}]);


app.controller('ViewDataController', ['$scope', 'userData', function($scope, userData){

}]);



app.controller('NewEntryController', ['$scope', '$http', '$location', 'userData', function($scope, $http, $location, userData){
  $scope.data = {};

  $scope.timeList = ["Dawn", "Morning", "Mid Day", "Afternoon", "Dusk", "Night"];
  $scope.categories = ["Birds", "Mammals", "Herps", "Invertebrates", "Plants", "Other"];
  $scope.sexList = ["Female", "Male", "Unknown"];
  $scope.ageList = ["Adult", "Juvenile", "Neonate"];
  $scope.tempList = ["0˚<", "0˚ - 15˚", "16˚ - 32˚", "33˚ - 49˚", "50˚ - 69˚", "70˚ - 89˚", ">90˚"];
  // $scope.weatherList = ["Sunny", "Overcast", "Raining", "Snowing", "Foggy", "Windy", "Other"];

  var username = userData.currentUser.username;
  var userID = userData.currentUser.id;
  // var date = Date.now();
  var date;

  $scope.submitEntry = function(){
    console.log($scope.data);
    $http({
      url: '/api/newEntry',
      method: 'POST',
      params: {user_id: userID,
              username: username,
              date_submitted: date,
              category: $scope.data.category,
              common_name: $scope.data.common_name,
              scientific_name: $scope.data.scientific_name,
              location_country: $scope.data.location_country,
              location_state: $scope.data.location_state,
              location_county: $scope.data.location_county,
              year_spotted: $scope.data.year_spotted,
              month_spotted: $scope.data.month_spotted,
              day_spotted: $scope.data.day_spotted,
              time_spotted: $scope.data.time_spotted,
              group: $scope.data.group,
              number_in_group: $scope.data.number_in_group,
              individual_sex: $scope.data.sex,
              individual_age: $scope.data.age,
              individual_description: $scope.data.individual_description,
              sunny: $scope.data.sunny,
              overcast: $scope.data.overcast,
              raining: $scope.data.raining,
              snowing: $scope.data.snowing,
              foggy: $scope.data.foggy,
              windy: $scope.data.windy,
              other_weather: $scope.data.other_weather,
              temperature: $scope.data.temperature,
              additional_notes: $scope.data.additional_notes
      }
    }).then(function(response){
        $location.path(response.data);
      });
  };
}]);

app.controller('EntrySuccessController', ['$scope', 'userData', function($scope, userData){

}]);


app.controller('LogOutController', ['$scope', 'userData', function($scope, userData){
  $scope.warning = "Are you sure you want to log out, " + userData.currentUser.username + "?";
}]);



app.controller('FailController', ['$scope', function($scope){
  console.log("Ha ha!");
}]);

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              App Factories
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.factory('userData', ['$http', '$timeout', function($http, $timeout){

  var currentUser = {
    username: '',
    id: ''
  };

  var setUser = function(username){
    currentUser.username = username;
    changeNavLinks();
  };

  var setUserID = function(username){
      var params = '/' + username;

      $http.get('/api/getUser' + params).then(function(response){
          currentUser.id = response.data.user.id;
      });
  };

  return {
    currentUser: currentUser,
    setUser: setUser,
    setUserID: setUserID
  };

}]);
