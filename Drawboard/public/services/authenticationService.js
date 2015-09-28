angular.module('DrawBox').service('AuthenticationService', function (SocketService) {
    this.register = function (username, password, callback) {
        SocketService.emit("register", { username: username, password: password }, callback);
    }
        
    this.login = function (username, password, callback) {
        SocketService.emit("login", { username: username, password: password }, callback);
    }
});