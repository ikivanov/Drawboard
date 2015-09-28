angular.module('DrawBox').controller('LoginController', function ($scope, $location, AuthenticationService) {
    $scope.username = "";
    $scope.password = "";

    $scope.init = function () {
    }

    $scope.Login = function () {
        AuthenticationService.login($scope.username, $scope.password, function (data) {
            if (data.success) {
                $location.path("/drawboard/123");
            } else {
                alert(data.msg);
            }
        });
    }
});