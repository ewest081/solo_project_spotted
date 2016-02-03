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

    if(userData.currentUser !== null){
      $scope.notSignedIn = false;
      $scope.signedIn = true;
    }else{
      $scope.notSignedIn = true;
      $scope.signedIn = false;
    }
}]);



app.controller('HomeController', ['$scope', function($scope){
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
      $location.path(response.data);
      userData.sendData($scope.data);
    });
    // console.log("SignInController: ", $scope.data);
  };

}]);



app.controller('RegisterController', ['$scope', function($scope){

}]);



app.controller('GuestController', ['$scope', function($scope){

}]);



app.controller('UserController', ['$scope', 'userData', function($scope, userData){
    $scope.$on('data_shared', function(){
      $scope.thisUser = userData.getData();
    });

    $scope.welcome = "Welcome, " + $scope.thisUser.username;

    console.log("UserController: ", $scope.thisUser);
}]);



app.controller('FailController', ['$scope', function($scope){
  console.log("Ha ha!");
}]);

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              App Factories
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.factory('userData', ['$rootScope', '$timeout', function($rootScope, $timeout){

  var currentUser = {};
  currentUser.data = null;

  currentUser.sendData = function(data){
    currentUser.data = data;
    $timeout(function(){
      $rootScope.$broadcast('data_shared');
    }, 100);
  };
  currentUser.getData = function(){
    return currentUser.data;
  };

  // console.log("userData:", currentUser);
  return currentUser;

}]);
