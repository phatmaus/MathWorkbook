var QuestionService = function ($http, $firebaseArray) {
    var questions = [];
    var currentlySelectedQuestion = 0;
    var ref = new Firebase("https://test-angular-fire-ap.firebaseio.com/questions");

    var q = $firebaseArray(ref);

    /*    this.getQuestions = function (callback) {
            $http.get('/questions').success(function (data) {
                questions = data;
                callback(questions);
            })
        }*/

    this.forceGetQuestions = function () {
        return $http.get('/questions').success(function (data) {
            questions = data;
        })
    }

    this.addQuestion = function (question) {
        return $http.post("/questions", question).error(function (data, status, headers, config) {
            console.error("couldnt add question because of:" + data);
            return false;
        }).success(function (data, status, headers, config) {
            question.answers = [];
            questions.push(question);
            return true;
        })
    }
}
