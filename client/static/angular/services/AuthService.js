var AuthService = function ($http, SessionService) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post('/login', credentials)
            .success(function (data, status, header, config) {
                SessionService.create(data.sessionId, data.serverId,
                    data.userType, data.userName);
                return true;
            }).error(function (data, status, header, config) {
                console.error("tried to log in" + data);
                SessionService.destroy();
                return false;
            })
    }

    authService.logout = function () {
        return $http
            .get('/logout')
            .finally(function () {
                SessionService.destroy();
                return true;
            })
    }

    authService.check = function () {
        return $http
            .get('/checkLogin')
            .success(function (data, status, header, config) {
                SessionService.create(data.sessionId, data.serverId,
                    data.userType, data.userName);
                return true;
            })
    }

    authService.isAuthenticated = function () {
        return !!SessionService.userId;
    }

    authService.getUserName = function () {
        return SessionService.userName;
    }

    return authService;
}
