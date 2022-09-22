const router = require('express').Router();
const {Post, User, Comment} = require('../models/');
const withAuth = require('../utils/auth');

//dashboard with all post

router.get('/', withAuth, (req, res) =>{
    console.log('checkallpost');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'create_at'
        ],
        include: [
           
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'create_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]

    })
    .then(Postdata => {
        const posts = Postdata.map(post => post.get({plain: true}));
        res.render('dashboard',{
            layout: 'dashboard',
            posts
        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//use for user that are loggedin
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {id:req.params.id},
        attributes:[
            'id',
            'title',
            'post_text',
            'create_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'create_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
        
    })
    .then(Postdata => {
        const posts = Postdata.map(post => post.get({plain: true}));
        res.render('edit-post',{
            layout: 'dash',
            posts
        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports =router;

