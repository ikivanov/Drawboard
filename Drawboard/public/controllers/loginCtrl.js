angular.module('DrawBox').controller('LoginController', function ($scope, $location) {
    $scope.username = "";
    $scope.password = "";

    $scope.Login = function () {
        //alert("Username = " + $scope.username);

        $location.path("/drawboard/123");
    }
});