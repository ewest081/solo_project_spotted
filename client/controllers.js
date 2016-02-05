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


app.controller('EntrySuccessController', ['$scope', 'userData', function($scope, userData){

}]);


app.controller('LogOutController', ['$scope', 'userData', function($scope, userData){
  $scope.warning = "Are you sure you want to log out, " + userData.currentUser.username + "?";
}]);


app.controller('FailController', ['$scope', function($scope){
  console.log("Ha ha!");
}]);
