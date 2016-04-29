(function() {
    angular.module('DrawBox').controller('RegisterController', function ($scope, $location, AuthenticationService) {
        $scope.username = "";
        $scope.password = "";
        $scope.password2 = "";
    
        var validate = function () {
            if ($scope.password !== $scope.password2) {
                alert('Passwrods do not match!');
                return false;
            }

            return true;
        }

        $scope.registerBtnClicked = function () {
            if (!validate()) {
                return;
            }

            AuthenticationService.register($scope.username, $scope.password, function (data) {
                if (data.success) {
                    $location.path("/drawboard/123");
                } else {
                    alert(data.msg);
                }
            });
        }
    });
})();