var NewQuestionController = function ($scope, QuestionService, AuthService, $timeout, $firebaseArray) {
    $scope.userName = AuthService.getUserName();
    $scope.newQuestion = {};
    var ref = new Firebase("https://test-angular-fire-ap.firebaseio.com/questions");
    $scope.questions = $firebaseArray(ref);

    $scope.addQuestion = function (valid) {
        if (valid) {
            $scope.newQuestion.userName = $scope.userName;
            $scope.newQuestion.createdTimeStamp = Date.now();
            $scope.questions.$add($scope.newQuestion);
            $scope.newQuestion = {};
            $scope.questionAdded = "question added";
            $timeout(function () {
                $scope.questionAdded = "";
            }, 1000);
        }
    }

    $scope.cancel = function () {
        $scope.newQuestion.question = "";
        $scope.newQuestion.description = "";
        var item = $scope.questions[1];
        $scope.questions.$remove(item);

    }
}
