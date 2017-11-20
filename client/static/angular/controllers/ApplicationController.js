var ApplicationController = function ($scope, AuthService, $location) {
    $scope.currentUser = null;
    $scope.isAuthenticated = true;

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

    $scope.logout = function () {
        AuthService.logout().then(function() {
            $location.path("/login");
        });
    }
}
