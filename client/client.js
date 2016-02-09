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
        .when('/update_success', {
          templateUrl: 'views/update_success.html',
          controller: 'UpdateSucessController',
        })
        .when('/edit_entry', {
          templateUrl: 'views/edit_entry.html',
          controller: 'EditEntryController',
        })
        .when('/view_entry', {
          templateUrl: 'views/view_entry.html',
          controller: 'ViewEntryController',
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


app.controller('EntrySuccessController', ['$scope', 'userData', function($scope, userData){

}]);


app.controller('UpdateSucessController', ['$scope', 'userData', function($scope, userData){

}]);


app.controller('LogOutController', ['$scope', '$http', 'userData', '$location', function($scope, $http, userData, $location){
  $scope.warning = "Are you sure you want to log out, " + userData.currentUser.username + "?";

  $scope.logOut = function(){
    userData.clearUser();

    $http.get('/logout', function(){

    }).then(function(response){
      $location.path(response.data);
    });
  };


}]);


app.controller('FailController', ['$scope', function($scope){
  console.log("Ha ha!");
}]);


app.controller('ViewDataController', ['$scope', 'userData', 'currentEntry', '$http', '$location', function($scope, userData, currentEntry, $http, $location){
  $scope.thisUser = userData.currentUser.username;
  var userID = userData.currentUser.id;

  $scope.simpleList = false;
  $scope.sortType = false;
  $scope.keyword = false;
  $scope.viewTable = false;
  $scope.responseLength = 0;
  $scope.complexResponse = false;

  $scope.categorySelect = "All";
  $scope.categories = ["All", "Birds", "Mammals", "Herps", "Invertebrates", "Plants", "Other"];
  $scope.view = "View More";

  $scope.startDate = '';
  $scope.endDate = '';
  $scope.nameSearch = '';
  $scope.locationSearch = '';
  $scope.globalSearch = false;
  $scope.keywordParam = '';

  $scope.entries = [];

  $scope.simpleListTog = function(){
    $scope.simpleList = $scope.simpleList === true ? false: true;
    $scope.sortType = false;
    $scope.keyword = false;
    $scope.viewTable = false;
    $scope.entries = [];
  };
  $scope.sortTypeTog = function(){
    $scope.sortType = true;
    $scope.keyword = false;
    $scope.viewTable = false;
    $scope.simpleList = false;
    $scope.entries = [];
  };
  $scope.keywordTog = function(){
    $scope.keyword = $scope.keyword === true ? false: true;
    $scope.sortType = false;
    $scope.simpleList = false;
    $scope.viewTable = false;
    $scope.entries = [];
  };
  $scope.viewTableTog = function(){
    $scope.viewTable = $scope.viewTable === true ? false: true;
    $scope.sortType = false;
    $scope.keyword = false;
    $scope.simpleList = false;
    $scope.entries = [];
  };


  $scope.getSimpleList = function(){
    var category = $scope.categorySelect;

    if($scope.categorySelect == "All"){
      category = null;
    }else{
      category = $scope.categorySelect;
    }

    $http({
      url: '/api/getSimpleList',
      method: 'GET',
      params: {user_id: userID,
              category: category
              }
    }).then(function(response){
        for(i = 0; i < response.data.length; i++){
          response.data[i].show = false;
          response.data[i].view = "View More";
        }
        $scope.entries = response.data;
      });
  };

  $scope.getTableData = function(){
    $http({
      url: '/api/getTableData',
      method: 'GET',
      params: {user_id: userID
              }
    }).then(function(response){
        $scope.entries = response.data;
      });
  };

  $scope.viewEntry = function(entry){
    entry.show = entry.show === true ? false: true;

    if(entry.view == "View More"){
      entry.view = "View Less";
    }else{
      entry.view = "View More";
    }
  };

  $scope.getComplexList = function(){
    var category = $scope.categorySelect;
    var start_date = $scope.startDate;
    var end_date = $scope.endDate;
    var name_search = '%' + $scope.nameSearch + '%';
    var location_search = '%' + $scope.locationSearch + '%';

    if($scope.categorySelect == "All"){
      category = null;
    }
    if($scope.startDate === ''){
      start_date = 0;
    }
    if($scope.endDate === ''){
      end_date = 9999;
    }

    $http({
      url: '/api/getComplexList',
      method: 'GET',
      params: {user_id: userID,
              category: category,
              start_date: start_date,
              end_date: end_date,
              name_search: name_search,
              location_search: location_search,
              global_search: $scope.globalSearch
              }
    }).then(function(response){
        $scope.entries = response.data;
        $scope.responseLength = response.data.length;
        $scope.complexResponse = true;
        // console.log(response.data);
      });
  };

  $scope.globalView = function(entry){
    currentEntry.setEntry(entry);
    $location.path('/view_entry');
  };

  $scope.keywordSearch = function(){
    var keyword = '%' + $scope.keywordParam + '%';

    $http({
      url: '/api/getKeyword',
      method: 'GET',
      params: {user_id: userID,
              keyword: keyword,
              global_search: $scope.globalSearch
      }
    }).then(function(response){
      $scope.entries = response.data;
      $scope.responseLength = response.data.length;
      $scope.complexResponse = true;
      console.log(response.data);
    });
  };

  $scope.editEntry = function(entry){
    currentEntry.setEntry(entry);
    $location.path('/edit_entry');
  };

}]);



app.controller('ViewEntryController', ['$scope', 'userData', 'currentEntry', '$location', function($scope, userData, currentEntry, $location){
  $scope.data = currentEntry.currentEntry.data;
  $scope.weather = [];
  $scope.groupMessage = '';
  $scope.loggedInUser = false;
  $scope.thisUser = userData.currentUser.username;

  makeWeather = function(){
    if($scope.data.sunny === true){
      $scope.weather.push('Sunny');
    }
    if($scope.data.raining === true){
      $scope.weather.push('Raining');
    }
    if($scope.data.foggy === true){
      $scope.weather.push('Foggy');
    }
    if($scope.data.snowing === true){
      $scope.weather.push('Snowing');
    }
    if($scope.data.windy === true){
      $scope.weather.push('Windy');
    }
    if($scope.data.overcast === true){
      $scope.weather.push('Overcast');
    }
    if($scope.data.other_weather !== null){
      $scope.weather.push($scope.data.other_weather);
    }
  };

  makeGroupInfo = function(){
    var groupNum = '';
    if($scope.data.number_in_group > 1){
      groupNum = ' of ' + $scope.data.number_in_group + ' individuals.';
    }
    if($scope.data.is_group == 'group'){
      $scope.groupMessage = 'Spotted in a group' + groupNum;
    }else if ($scope.data.is_group == 'individual'){
      $scope.groupMessage = 'Spotted as an individual.';
    }
  };

  userLoggedIn = function(){
    if($scope.data.username == $scope.thisUser){
      $scope.loggedInUser = true;
    }
  };

  $scope.editEntry = function(){
    currentEntry.setEntry($scope.data);
    $location.path('/edit_entry');
  };

  makeWeather();
  makeGroupInfo();
  userLoggedIn();
}]);



app.controller('EditEntryController', ['$scope', '$http', '$location', 'userData', 'currentEntry', function($scope, $http, $location, userData, currentEntry){
  $scope.data = currentEntry.currentEntry.data;
  console.log($scope.data);

  $scope.timeList = ["Dawn", "Morning", "Mid Day", "Afternoon", "Dusk", "Night"];
  $scope.categories = ["Birds", "Mammals", "Herps", "Invertebrates", "Plants", "Other"];
  $scope.sexList = ["Female", "Male", "Unknown"];
  $scope.ageList = ["Adult", "Juvenile", "Neonate"];
  $scope.tempList = ["0˚<", "0˚ - 15˚", "16˚ - 32˚", "33˚ - 49˚", "50˚ - 69˚", "70˚ - 89˚", ">90˚"];

  var username = userData.currentUser.username;
  var userID = userData.currentUser.id;
  // var date = Date.now();
  var date;

  $scope.updateEntry = function(){
    // console.log($scope.data);
    $http({
      url: '/api/updateEntry',
      method: 'POST',
      params: {user_id: userID,
              username: username,
              date_updated: date,
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
              additional_notes: $scope.data.additional_notes,
              id: $scope.data.id
      }
    }).then(function(response){
        $location.path(response.data);
        //clear curent entry
      });
  };

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
    // console.log($scope.data);
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

  var clearUser = function(username){
    currentUser.username = '';
    changeNavLinks();
  };

  return {
    currentUser: currentUser,
    setUser: setUser,
    setUserID: setUserID,
    clearUser: clearUser
  };

}]);

app.factory('currentEntry', ['$http', function($http){
  var currentEntry = {
    data: {}
  };

  var setEntry = function(entry){
    currentEntry.data = entry;
  };

  var clearCurrentEntry = function(){
    currentEntry.data = {};
  };

  return {
    currentEntry: currentEntry,
    setEntry: setEntry,
    clearCurrentEntry: clearCurrentEntry
  };

}]);
