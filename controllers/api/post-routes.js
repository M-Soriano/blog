const router = require('express').Router();
const { title } = require('process');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

//get all user//git route borrow and modify from course work
router.get('/', withAuth, (req, res) => {
    
    Post.findAll({
      attributes: [
        'id',
        'post_text',
        'title',
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
            'create_at'],
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
      .then(PostData => res.json(PostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'post_text',
            'title',
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
                'create_at'],
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
    .then(PostData => {
        if(!PostData){
            res.status(500).json({ message: 'No post found with this ID.'});
            return;
        }
        res.json(PostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

  });


//create post
router.post('/', withAuth, (req,res) => {
    const body = req.body;

    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(PostData => res.json(PostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
    },
    {
        where: {
            id:req.params.id
        }
    }
     )
     .then(PostData => {
        if (PostData > 0){
            res.status(200).end();
        } else {
            res.status(404).end();
        }
     })
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth,(req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(PostData => {
        if (PostData > 0){
            res.status(200).end();
        } else {
            res.status(404).end();
        }
     })
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports =router;
