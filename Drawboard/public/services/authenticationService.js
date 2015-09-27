angular.module('DrawBox').service('AuthenticationService', function () {
    this.register = function (username, password, callback) {
        alert("register");
    }

    this.login = function (username, password, callback) {
        alert("login");
    }
});