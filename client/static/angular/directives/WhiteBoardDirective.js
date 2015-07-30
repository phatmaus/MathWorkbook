var WhiteBoardDirective = function ($firebaseObject, $timeout) {
    return {
        link: function ($scope, element, atributes) {
            element[0].width = (window.innerWidth);
            element[0].height = 11 / 8.5 * element[0].width;

            var dbToBaseLayerMapping = {};

            var generateDbPathForLine = function (segments, alert) {
                var dbPath = {
                    color: $scope.activeColor,
                    width: $scope.activePenSize,
                    type: alert ? "alert" : "line",
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
                var dbPoint = {
                    color: $scope.activeColor,
                    width: ($scope.activePenSize / 2),
                    type: "point",
                    point: {
                        x: point.x,
                        y: point.y
                    }
                }
                return dbPoint;
            }

            paper.setup(element[0].id);

            var backgroundLayer = new paper.Layer();

            var baseLayer = new paper.Layer();

            var tempLayer = new paper.Layer();
            tempLayer.activate();

            var pathsArrayUnWatch = $scope.pathsArray.$watch(function watchPathsArray(data) {
                if (data.event == "child_added") {
                    var pos = $scope.pathsArray.length - 1;
                    var color = $scope.pathsArray[pos].color;
                    var width = $scope.pathsArray[pos].width;
                    var type = $scope.pathsArray[pos].type;
                    if (type == "line" || "alert") {
                        var dashArray = (type == "line") ? [] : [4, 4];
                        var segments = $scope.pathsArray[pos].segments;
                        var newPath = new paper.Path(segments);
                        newPath.strokeWidth = width;
                        newPath.strokeColor = color;
                        newPath.simplify(0.5);
                        newPath.strokeCap = "round";
                        newPath.dashArray = dashArray;
                        var newlyAddedPath = baseLayer.addChild(newPath);
                        dbToBaseLayerMapping[data.key] = newlyAddedPath._index;
                        paper.view.update(true);

                        if (type == "alert") {
                            $timeout(function () {
                                var indexToremove = $scope.pathsArray.$indexFor(data.key);
                                $scope.pathsArray.$remove(indexToremove);
                                paper.view.update(true);
                            }, 1111);
                        }
                    } else if (type == "point") {
                        var point = $scope.pathsArray[pos].point;
                        newPath = new paper.Path.Circle(new paper.Point(point.x, point.y), width);
                        newPath.strokeColor = color;
                        newPath.fillColor = color;
                        var newlyAddedPath = baseLayer.addChild(newPath);
                        firebaseToPaperArrayMapping[data.key] = newlyAddedPath._index;
                        paper.view.update(true);
                    }
                } else if (data.event == "child_removed") {
                    var indexToremove = dbToBaseLayerMapping[data.key];
                    paper.project.layers[1].removeChildren(indexToremove, indexToremove + 1);
                    for (var key in dbToBaseLayerMapping) {
                        if (dbToBaseLayerMapping[key] > indexToremove) { //this keeps the references synced
                            dbToBaseLayerMapping[key] = dbToBaseLayerMapping[key] - 1;
                        }
                    }
                    paper.view.update(true);
                }
            })

            var tempPath;
            var tool = new paper.Tool();
            //tool.maxDistance = 1;

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
                tempPath.dashArray = $scope.dashArray;
                tempPath.add(event.point);

                touchDown = event.point;
            }

            tool.onMouseDrag = function (event) {
                tempPath.add(event.point);
            }

            tool.onMouseUp = function (event) {
                if (touchDown.x == event.point.x && touchDown.y == event.point.y) {
                    tempPath = new paper.Path.Circle(event.point, $scope.activePenSize / 2);
                    tempPath.strokeColor = $scope.activeColor;
                    tempPath.fillColor = $scope.activeColor;
                    var dbPoint = generateDbPathForCircle(event.point);
                    tempPath.remove();
                    paper.view.update(true);
                    $scope.pathsArray.$add(dbPoint);
                } else {
                    tempPath.simplify(0.5);
                    var dbPath = generateDbPathForLine(tempPath._segments, !!$scope.alertTool);
                    tempPath.remove();
                    paper.view.update(true);
                    $scope.pathsArray.$add(dbPath).then(function pathAdded() {})
                }

            }
        }
    };
}
