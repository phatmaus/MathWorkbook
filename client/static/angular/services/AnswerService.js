var AnswerService = function ($http, QuestionService) {
    var answers = [];

    var currentlySelectedQuestion = 0;

    this.getAnswers = function (callback) {
        $http.get('/answers').success(function (data) {
            answers = data;
            callback(answers);
        })
    }

    this.addAnswer = function (answer) {
        this.getAnswers(function () {});

        return $http.post("/answers", answer).error(function (data, status, headers, config) {
            console.error("couldnt add answer because of:" + data);
            return false;
        }).success(function (data, status, headers, config) {
            QuestionService.forceGetQuestions().then(function () {
                answers.push(answers);
                return true;
            })
        })
    }

    this.addLike = function (answer) {
        this.getAnswers(function () {});

        return $http.put("/answers", answer).error(function (data, status, headers, config) {
            console.error("couldnt add like because of:" + data);
            return false;
        }).success(function (data, status, headers, config) {
            QuestionService.forceGetQuestions().then(function () {
                return true;
            })
        })
    }
}
