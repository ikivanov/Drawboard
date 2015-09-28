angular.module('DrawBox').controller('RegisterController', function ($scope, $location, AuthenticationService) {
    $scope.username = "";
    $scope.password = "";

    $scope.Register = function () {
        AuthenticationService.register($scope.username, $scope.password, function (data) {
            if (data.success) {
                $location.path("/drawboard/123");
            } else {
                alert(data.msg);
            }
        });
    }
});