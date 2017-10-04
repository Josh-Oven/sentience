angular.module('sentience', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: './views/start.html'
    })

    .state('directory', {
      url: '/directory',
      templateUrl: './views/directory.html'
    })

    .state('prologueHe', {
      url: '/he',
      templateUrl: './views/prologue/he.html'
    })

    $urlRouterProvider.otherwise('/start')

})
