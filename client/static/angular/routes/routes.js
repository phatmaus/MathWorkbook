var routes = function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angular/views/home.html"
    }).when("/newAnswer", {
        templateUrl: "angular/views/newAnswer.html"
    }).when("/viewQuestion", {
        templateUrl: "angular/views/viewQuestion.html"
    }).when("/newQuestion", {
        templateUrl: "angular/views/newQuestion.html"
    }).when("/products", {
        templateUrl: "angular/views/products.html"
    }).when("/orders", {
        templateUrl: "angular/views/orders.html"
    }).when("/login", {
        templateUrl: "angular/views/loginForm.html"
    }).when("/dashboard", {
        templateUrl: "angular/views/dashboard.html"
    }).otherwise({
        redirectTo: "/"
    })
}
