// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){
  var app = angular.module('starter', ['ionic', 'angularMoment'])

  app.controller('RedditController', function($scope, $http){
    $scope.posts = [];
    $http.get('https://www.reddit.com/r/gaming/.json')
      .success(function(posts){
        //console.log(posts);
        angular.forEach(posts.data.children, function(post){
          $scope.posts.push(post.data);
        });
      });

    $scope.cargarNuevosPosts = function () {
      var params_f = [];
      if($scope.posts.length > 0){
        params_f['after'] = $scope.posts[$scope.posts.length - 1].name;
      }
      $http.get('https://www.reddit.com/r/gaming/.json', {params:params_f})
      .success(function(posts){
        //console.log(posts);
        angular.forEach(posts.data.children, function(post){
          $scope.posts.push(post.data);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

}());
