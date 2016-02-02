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
var user = null;

app.controller('MainController', ['$scope', function($scope){
    $scope.notSignedIn = true;
    $scope.signedIn = false;

    if(user !== null){
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

app.controller('SignInController', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.data = {};

  $scope.submitData = function(){
    $http.post('/', $scope.data).then(function(response){
      $location.path(response.data);
    });
  };


}]);

app.controller('RegisterController', ['$scope', function($scope){

}]);

app.controller('GuestController', ['$scope', function($scope){

}]);

app.controller('UserController', ['$scope', 'userData', function($scope, userData){
  $scope.user = userData;

}]);

app.controller('FailController', ['$scope', function($scope){

}]);

//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              App Factories
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.factory('userData', '$http',[function($http){
    var user = {};

      $http.get('/getUser').then(function(response){
             user = response.data;
          });

    return user;
}]);
