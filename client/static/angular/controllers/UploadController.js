var UploadController = function ($scope, $location, $firebaseObject) {
    var refArr = new Firebase(APP.FB_URL + "XXX/backGroundImage");
    var backGroundImage = $firebaseObject(refArr);
    var runOnce = false;
    var videoStream = null;
    var video = document.querySelector("#video");
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext("2d");

    var createSrc = window.URL ? window.URL.createObjectURL : function (stream) {
        return stream;
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getUserMedia({
            video: true
        },
        function (stream) {
            videoStream = stream;
            video.src = createSrc(stream);
            video.play();
        },
        function (err) {
            console.log(err);
        })

    $scope.goBack = function () {
        if (!!videoStream) {
            videoStream.stop();
        }
        $location.path("/");
    }

    $scope.eraseImage = function () {
        backGroundImage.image = "";
        backGroundImage.$remove().then(function (ref) {
            if (!!videoStream) {
                videoStream.stop();
            }
            $location.path("/");
        })
    }

    $scope.captureImage = function () {
        if (videoStream && !runOnce) {
            runOnce = true;
            var videoWidth = video.offsetWidth;
            var videoHeight = video.offsetHeight;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            context.drawImage(video, 0, 0, videoWidth, videoHeight);
            backGroundImage.image = canvas.toDataURL("image/jpeg");
            backGroundImage.$save().then(function (ref) {
                if (!!videoStream) {
                    videoStream.stop();
                }
                $location.path("/");
            })
        }
    }
}
