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
