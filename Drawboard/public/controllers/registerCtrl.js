angular.module('DrawBox').controller('RegisterController', function ($scope) {
    $scope.username = "";
    $scope.password = "";

    $scope.Register = function () {
        alert("Username = " + $scope.username);
    }
});