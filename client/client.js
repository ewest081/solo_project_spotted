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
    // $scope.globalUser = {};
    $scope.data = userData;

    changeNavLinks = function(){
      // if($scope.globalUser !== null){
      if($scope.data !== null){
        $scope.notSignedIn = false;
        $scope.signedIn = true;
      }else{
        $scope.notSignedIn = true;
        $scope.signedIn = false;
      }
    };
}]);///no longer nesting controllers

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
          userData.setUser($scope.data.username);
          console.log($scope.data.username);
          $location.path(response.data);

          // userData.sendData($scope.data);
          // $scope.globalUser = $scope.data.username;
          // changeNavLinks();
        });
        // console.log("SignInController: ", $scope.data.user);
        // userData.id = $scope.data.user.id;
        // userData.username = $scope.data.user.username;


      };

    }]);



    app.controller('RegisterController', ['$scope', function($scope){

    }]);



    app.controller('GuestController', ['$scope', function($scope){

    }]);



    app.controller('UserController', ['$scope', 'userData', function($scope, userData){
        console.log('hi:', userData.currentUser.username);
        $scope.thisUser = userData.currentUser.username;

        // $scope.$on('data_shared', function(){
        //   var sharedData = userData.getData();
        //   $scope.thisUser = sharedData;
        // });
        $scope.welcome = "Welcome, " + $scope.thisUser + "!";
        // $scope.welcome = "Welcome, " + $scope.globalUser.username + "!";

        console.log("UserController: ", userData.currentUser);
    }]);



    app.controller('FailController', ['$scope', function($scope){
      console.log("Ha ha!");
    }]);

// }]);
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
//              App Factories
//[][][][][][][][][][][][][][][][][][][][][][][][][][]
app.factory('userData', ['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout){

  var currentUser = {
    username: ''
  };
  // currentUser.data = false;

  // currentUser.sendData = function(data){
  //   this.data = data;
  //   // $timeout(function(){
  //     // $rootScope.$broadcast('data_shared');
  //
  //     // $http.get('/getUser').then(function(response){
  //     //   this.data = response.data;
  //     // });
  //     // changeNavLinks();
  //   // }, 100);
  // };
  // currentUser.getData = function(){
  //   return this.data;
  // };
var setUser = function(username){
  currentUser.username = username;
};

  // console.log("userData:", currentUser);
  // return currentUser;
  return {
    currentUser: currentUser,
    setUser: setUser
  };

}]);
