var UploadController = function ($scope, $location, $firebaseObject) {
    $scope.credentials = {
        userName: ''
    };
    $scope.addNameError = "";

    $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $scope.credentials.userName = "";
            $scope.addNameError = "";
            $location.path("/");
        }, function () {
            $scope.addNameError = "couldn't log in";
        });
    }
}
