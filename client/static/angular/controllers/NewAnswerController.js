var NewAnswerController = function ($scope, QuestionService, AnswerService, AuthService, $location) {
    $scope.userName = AuthService.getUserName();
    $scope.newAnswer = {};
    var questions = [];
    QuestionService.getQuestions(function gotQuestions(data) {
        questions = data;
    })

    $scope.addAnswer = function (valid) {
        if (valid) {
            $scope.newAnswer.userName = $scope.userName;
            $scope.newAnswer.createdTimeStamp = Date.now();
            $scope.newAnswer._question = questions[QuestionService.currentlySelectedQuestion]._id;

            AnswerService.addAnswer($scope.newAnswer).then(function (data) {
                $scope.newAnswer = {};
                $location.path("/viewQuestion");
            })
        }
    }
    $scope.cancel = function () {
        $scope.newAnswer = {};
    }
}
