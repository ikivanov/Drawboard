var app = angular.module("DrawBox", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            controller: "LoginController",
            templateUrl: "views/login.html"
        })
        .when("/drawboard/:id",
        {
            controller: "DrawboardController",
            templateUrl: "views/drawboard.html"
        })
        .when("/register",
        {
            controller: "RegisterController",
            templateUrl: "views/register.html"
        })
        .otherwise({
            redirectTo: "/"
        })
}]);