module.exports = (function () {
    var mongoose = require('mongoose');
    var Topic = mongoose.model('Topic');
    var Post = mongoose.model('Post');

    return {
        add: function (req, res) {
            Topic.findOne({}, function (err, topic) {
                var post = new Post({
                    content: "blah"
                })
                post._topic = topic._id;
                topic.posts.push(post);

                post.save(function (err) {
                    topic.save(function (err) {
                        res.sendStatus("200");
                    })
                })
            })
        }
    }
})();
