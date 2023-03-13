const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

// all posts for homepage
router.get('/', (req, res, next) => {
    Post.find({ isHidden: false }, null, { sort: { datePosted: "desc" } }, (err, posts) => {
        if (err) {
            res.status(500);
            return next(new Error(err));
        }

        res.status(200);
        return res.send(posts);
    });

});

// gets a singular post
router.get('/:postId', (req, res, next) => {
    Post.findOne({ _id: req.params.postId }, (err, post) => {
        if (err) {
            res.status(500);
            return next(new Error(err));
        }

        res.status(200);
        return res.send(post);
    });
});

// all posts of given user
router.get('/user/:userId', (req, res, next) => {

    Post.find({ user: req.params.userId, isHidden: false }, (err, posts) => {

        if (err) {
            res.status(500);
            return next(new Error(err));
        }

        res.status(200);
        return res.send(posts);

    });

});

// adds new post
router.post('/new', (req, res, next) => {

    const id = req.auth._id;

    // this saves id to user for the new Post
    req.body.user = id;

    // creates new post insatnce and saves it after
    const newPost = new Post(req.body);

    newPost.save((err, post) => {
        if (err) {
            res.status(500);
            return next(new Error(err));
        }
        res.status(201);
        return res.send(post);
    });

});

// hides posts
router.delete('/delete/:postId', (req, res, next) => {

    Post.updateOne({ _id: req.params.postId }, { isHidden: true }, (err, response) => {
        if (err) {
            console.log(err);
            res.status(500);
            return next(new Error("There was a server error."));
        }
        res.status(200);
        return res.send(response);
    });
});

// votes on posts
router.put('/vote/:postId/:vote', (req, res, next) => {

    const userId = req.auth._id;

    if (req.params.vote === 'upvote') {

        Post.findOne({ _id: req.params.postId }, (err, foundPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            if (foundPost.upvotes.includes(userId)) {

                foundPost.upvotes = foundPost.upvotes.filter(user => user === userId);
                foundPost.save();

                res.status(201);
                return res.send("success");

            }

            foundPost.upvotes.push(userId);
            foundPost.downvotes = foundPost.downvotes.filter(user => user === userId);
            foundPost.save();

            res.status(201);
            return res.send("success");

        });

        return;
    }

    Post.findOne({ _id: req.params.postId }, (err, foundPost) => {
        if (err) {
            res.status(500);
            return next(err);
        }

        if (foundPost.downvotes.includes(userId)) {

            foundPost.downvotes = foundPost.downvotes.filter(user => user === userId);
            foundPost.save();

            res.status(201);
            return res.send("success");

        }

        foundPost.downvotes.push(userId);
        foundPost.upvotes = foundPost.upvotes.filter(user => user === userId);
        foundPost.save();

        res.status(201);
        return res.send("success");

    });

});

// sorts posts
router.get('/sort/:sortType', (req, res, next) => {

    switch (req.params.sortType) {
        case 'newest-first':
            Post.find({ isHidden: false }).sort({ datePosted: -1 }).exec((err, posts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }

                res.status(200);
                return res.json(posts);
            });
            break;
        case 'oldest-first':
            Post.find({ isHidden: false }).sort({ datePosted: 1 }).exec((err, posts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }

                res.status(200);
                return res.json(posts);
            });
            break;
        case 'popular-first':
            Post.find({ isHidden: false }).sort({ upvotes: -1 }).exec((err, posts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }

                res.status(200);
                return res.json(posts);
            });
            break;
        case 'most-controversial':
            Post.find({ isHidden: false }).sort({ downvotes: -1 }).exec((err, posts) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }

                res.status(200);
                return res.send(posts);
            });
    }


});

module.exports = router;