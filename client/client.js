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
  $scope.simpleList = false;
  $scope.sortType = false;
  $scope.keyword = false;
  $scope.viewTable = false;

  $scope.simpleListTog = function(){
    $scope.simpleList = true;
    $scope.sortType = false;
    $scope.keyword = false;
    $scope.viewTable = false;
  };
  $scope.sortTypeTog = function(){
    $scope.sortType = true;
    $scope.keyword = false;
    $scope.viewTable = false;
    $scope.simpleList = false;
  };
  $scope.keywordTog = function(){
    $scope.keyword = true;
    $scope.sortType = false;
    $scope.simpleList = false;
    $scope.viewTable = false;
  };
  $scope.viewTableTog = function(){
    $scope.viewTable = true;
    $scope.sortType = false;
    $scope.keyword = false;
    $scope.simpleList = false;
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
