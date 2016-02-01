/**
 * Created by lizwestberg on 2/1/16.
 */
var app = angular.module('clientApp', []);

app.controller('MainController', ['$scope', function($scope){
    $scope.message = "Hello World"
}]);