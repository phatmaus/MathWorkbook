var myApp = angular.module('myApp', ['ngRoute', "underScore", "ngCacheBuster", "firebase"]).config(function (httpRequestInterceptorCacheBusterProvider) {
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*images.*/]);
});
myApp.config(["$routeProvider", routes]);

myApp.constant(APP);

myApp.service("SessionService", SessionService);
myApp.service("AuthService", AuthService);

myApp.controller('ApplicationController', ApplicationController);
myApp.controller('UploadController', UploadController);
myApp.controller('HomeController', HomeController);

myApp.filter('RangeFilter', RangeFilter);
myApp.filter('FieldGreaterThanFilter', FieldGreaterThanFilter);

myApp.directive("whiteboard", WhiteBoardDirective);

myApp.run(function ($rootScope, AuthService, $location, $interval) {
    /*    AuthService.check().then(function _redirectToMain() {
            $location.path("/");
        })
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!AuthService.isAuthenticated()) {
                $location.path("/login");
            }
        })*/
})
