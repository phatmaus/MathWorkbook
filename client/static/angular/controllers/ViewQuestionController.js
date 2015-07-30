var ViewQuestionController = function ($scope, QuestionService, AnswerService, $route) {
    $scope.questions = [];

    QuestionService.getQuestions(function gotQuestions(questions) {
        $scope.questions = questions;
        $scope.question = $scope.questions[QuestionService.currentlySelectedQuestion];
    })

    $scope.like = function (answer) {
        AnswerService.addLike(answer).then(function () {
            $route.reload();
        })
    }
}
