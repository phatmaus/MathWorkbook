var WhiteBoardDirective = function ($firebaseObject) {
    return {
        link: function ($scope, element, atributes) {

            var firebaseToPaperArrayMapping = {}

            var generateDbPathForLine = function (segments) {
                var dbPath = {
                    color: $scope.activeColor,
                    width: $scope.activePenSize,
                    type: "line",
                    segments: []
                }
                for (var i in segments) {
                    dbPath.segments.push({
                        x: segments[i]._point._x,
                        y: segments[i]._point._y
                    })
                }
                return dbPath;
            }

            var generateDbPathForCircle = function (point) {
                var dbPath = {
                    color: "blue",
                    width: 1,
                    type: "line",
                    segments: []
                }
                for (var i in segments) {
                    dbPath.segments.push({
                        x: segments[i]._point._x,
                        y: segments[i]._point._y
                    })
                }
                return dbPath;
            }

            paper.setup(element[0].id);

            var backgroundLayer = new paper.Layer();

            var baseLayer = new paper.Layer();

            var tempLayer = new paper.Layer();
            tempLayer.activate();

            var pathsArrayUnWatch = $scope.pathsArray.$watch(function watchPathsArray(data) {
                if (data.event == "child_added") {
                    var pos = $scope.pathsArray.length - 1;
                    var segments = $scope.pathsArray[pos].segments;
                    var color = $scope.pathsArray[pos].color;
                    var width = $scope.pathsArray[pos].width;
                    var type = $scope.pathsArray[pos].type;
                    if (type == "line") {
                        var newPath = new paper.Path(segments);
                        newPath.strokeWidth = width;
                        newPath.strokeColor = color;
                        newPath.simplify(2.0);
                        newPath.strokeCap = "round";
                        var newlyAddedPath = baseLayer.addChild(newPath);
                        firebaseToPaperArrayMapping[data.key] = newlyAddedPath._index;
                        paper.view.update(true);
                    }
                } else if (data.event == "child_removed") {
                    var indexToremove = firebaseToPaperArrayMapping[data.key];
                    paper.project.layers[1].removeChildren(indexToremove, indexToremove + 1);
                    paper.view.update(true);
                }
            })

            var tempPath;
            var tool = new paper.Tool();
            tool.maxDistance = 1;

            //Variables to handle the textTool
            var start, end, tempPath;

            var touchDown = {
                x: -1,
                y: -1
            }

            tool.onMouseDown = function (event) {

                tempPath = new paper.Path();
                tempPath.strokeColor = $scope.activeColor;
                tempPath.strokeCap = "round";
                tempPath.strokeWidth = $scope.activePenSize;

                touchDown = event.point;

                var activeTool;
                if ($scope.pencilTool) {
                    activeTool = 'pencilTool'
                } else if ($scope.eraserTool) {
                    activeTool = 'eraserTool';
                } else if ($scope.textTool) {
                    activeTool = 'textTool';
                }

            }

            tool.onMouseDrag = function (event) {
                tempPath.add(event.point);
            }

            tool.onMouseUp = function (event) {
                if (touchDown.x == event.point.x && touchDown.y == event.point.y) {
                    tempPath = new paper.Path.Circle(event.point, $scope.activePenSize / 2);
                    tempPath.strokeColor = $scope.activeColor;
                    tempPath.fillColor = $scope.activeColor;
                } else {
                    tempPath.simplify(2.0);
                    var dbPath = generateDbPathForLine(tempPath._segments);
                    tempPath.remove();
                    paper.view.update(true);
                    $scope.pathsArray.$add(dbPath).then(function pathAdded() {})
                }

            }
        }
    };
}
