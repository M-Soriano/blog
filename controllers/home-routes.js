const router = require('express').Router();
const {Post, Comment, User} =require('../models/');
//get all post for homepage
router.get('/', (req, res) => {
Post.findAll({
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
            attributes:['username']
        }
     ]
})
.then((PostData) => {
    const posts = PostData.map(post => post.get({plain: true}));
    res.render('all-posts',{ posts, loggedIn: req.session.loggedIn});
})
.catch((err) => {
    res.status(500).json(err);
});

});

//get single post

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where:{ 
            id: req.params.id
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
                attributes:['username']
            }

        ]


    })
    .then((PostData) => {

        const posts = PostData.map(post => post.get({plain: true}));
        res.render('single-posts',{ posts, loggedIn: req.session.loggedIn});
    })
    .catch((err) => {
        res.status(500).json(err);
    });
    
});

//login user 
router.get('/login', (req, res) => {
     if (req.session.loggedIn){
        res.redirect('/');
        return;
     }
     res.render('login');
});

//signup route
router.get('signup', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('signup')
});
module.exports = router;


