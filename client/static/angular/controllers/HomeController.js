var HomeController = function ($scope, QuestionService, $location, $firebaseObject, $firebaseArray, _) {
    var refArr = new Firebase(APP.FB_URL + "XXX/pathsArray");
    $scope.pathsArray = $firebaseArray(refArr);
    var refArr = new Firebase(APP.FB_URL + "XXX/backGroundImage");
    $scope.backGroundImage = $firebaseObject(refArr);
    $scope.hiddenBackground = document.querySelector("#hiddenBackground");

    $scope.pencilTool = true;
    $scope.colorOne = true;
    $scope.finePen = true;

    var colorObject = {
        colorOne: '#414141',
        colorTwo: '#009be7',
        colorThree: '#ed1c24',
        colorFour: '#4daf3e',
        colorFive: '#ff9300',
        colorSix: '#999999',
        colorSeven: '#662d91',
        colorEight: '#76817b'
    };

    var penSizes = {
        finePen: '1',
        thinPen: '3',
        mediumPen: '5',
        thickPen: '10'
    };

    $scope.activeColor = colorObject.colorOne;
    $scope.activePenSize = penSizes['finePen'];
    var oldActiveColor = $scope.activeColor;
    var oldActivePenSize = $scope.activePenSize;
    $scope.dashArray = []; //used for making dotted line, [] = solid

    $scope.uploadBackground = function () {
        $location.path("/upload");
    }

    $scope.changeTool = function (tool) {
        $scope.pencilTool = false;
        $scope.eraserTool = false;
        $scope.alertTool = false;

        $scope[tool] = true;

        if ($scope.pencilTool || $scope.alertTool) {
            $scope.activeColor = oldActiveColor;
            $scope.activePenSize = oldActivePenSize;
        } else if ($scope.eraserTool) {
            oldActiveColor = $scope.activeColor;
            oldActivePenSize = $scope.activePenSize;
            $scope.activeColor = '#ffffff';
            $scope.activePenSize = 4;
        }

        if ($scope.alertTool) {
            $scope.dashArray = [4, 4];
        } else {
            $scope.dashArray = [];
        }
    };

    $scope.changeColor = function (color) {
        if (!$scope.eraserTool) {
            $scope.colorOne = false;
            $scope.colorTwo = false;
            $scope.colorThree = false;
            $scope.colorFour = false;
            $scope.colorFive = false;
            $scope.colorSix = false;
            $scope.colorSeven = false;
            $scope.colorEight = false;

            $scope[color] = true;
            $scope.activeColor = colorObject[color];
        }
    };

    $scope.changePenSize = function (penSize) {
        if (!$scope.eraserTool) {
            $scope.finePen = false;
            $scope.thinPen = false;
            $scope.mediumPen = false;
            $scope.thickPen = false;

            $scope[penSize] = true;
            $scope.activePenSize = penSizes[penSize];
        }
    };

    $scope.clearPage = function () {
        var indexesToRemove = []
        $scope.pathsArray.forEach(function (element, index) {
            indexesToRemove.push(index);
        })
        for (var i = indexesToRemove.length - 1; i >= 0; i--) {
            var index = indexesToRemove[i];
            paper.project.layers[1].removeChildren(index, index + 1);
            var path = $scope.pathsArray[index];
            $scope.pathsArray.$remove(path);
        };
        paper.view.update(true);

        $scope.disconnect = function () {
            delete localStorage.user;
            delete localStorage.board_id;
            $location.path("/connect");
        }
    }
}
