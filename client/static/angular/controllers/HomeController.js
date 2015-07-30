var HomeController = function ($scope, QuestionService, $location, $firebaseObject, $firebaseArray, _) {
    var refArr = new Firebase(APP.FB_URL + "XXX_arr");
    $scope.pathsArray = $firebaseArray(refArr);
    $scope.pathsArray.$loaded().then(function pathsArrayLoaded() {})

    $scope.pencilTool = true;
    $scope.colorOne = true;
    $scope.thinPen = true;

    $scope.board_id = 0;

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
    $scope.activePenSize = penSizes['thinPen'];

    var _activeColor, _activePenSize;

    $scope.changeTool = function (tool) {
        $scope.pencilTool = false;
        $scope.eraserTool = false;
        $scope.textTool = false;

        $scope[tool] = true;

        if ($scope.pencilTool) {
            $scope.activeColor = _activeColor;
            $scope.activePenSize = _activePenSize;
        }

        if ($scope.eraserTool) {
            _activeColor = $scope.activeColor;
            _activePenSize = $scope.activePenSize;
            $scope.activeColor = '#ffffff';
            $scope.activePenSize = 20;
        }

        if ($scope.textTool) {
            _activeColor = $scope.activeColor;
            _activePenSize = $scope.activePenSize;
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

        $scope.createShareLink = function () {
            window.prompt("Copy the link below. Anyone with this link will be able to see and draw on this whiteboard", window.location.origin + "/#/whiteboard/" + $scope.board_id);
        }

    }
}
