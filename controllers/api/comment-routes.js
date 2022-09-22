const router = require('express').Router();
const {Comment} = require('../../models/');
//need for the middleware
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res)=> {
    Comment.findAll()
    .then(CommentData => res.json(CommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

router.post('/', withAuth, (req, res)=> {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(CommentData => res.json(CommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
      
});

module.exports = router;
