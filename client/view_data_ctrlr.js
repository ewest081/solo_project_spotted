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
