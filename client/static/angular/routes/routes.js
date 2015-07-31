var routes = function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angular/views/home.html"
    }).when("/upload", {
        templateUrl: "angular/views/upload.html"
    }).otherwise({
        redirectTo: "/"
    })
}
