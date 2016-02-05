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
