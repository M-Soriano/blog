const router = require('express').Router();
const {User, Post, Comment} = require('../../models');


//get all user/
router.get('/', (req, res) => {
    
    User.findAll({
      attributes: {exclude:['password']}
    })
    .then(UserData => res.json(UserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude:['password']},
        
        where: { id: req.params.id},
          include: [
            {
              model: Post,
              attributes: [
                'id',
                'title',
                'content',
                'create_at']
             
            },
            {
              model: Comment,
              attributes: [
                'id',
                'comment_text',
                'create_at'
              ],
              include: {
                model: Post,
                attributes: ['title']
              }
            },
            {
                model: Post,
                attributes: ['title']

            }
          ]
    })
    .then(UserData => {
        if(!UserData){
            res.status(404).json({ message: 'No User found with this ID.'});
            return;
        }
        res.json(UserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//create post
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        password:req.body.password
    })
    .then(UserData => {
        req.session.save(() => {
            req.session.user_id = UserData.id;
            req.session.username = UserData.username;
            req.session.loggedIn = true;

            res.json(UserData);
        });       
    })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});


router.post('/login', (req, res) => {
 User.findOne({
    where: {
        username: req.body.username
    }
 })
 .then(UserData => {
    if (!UserData) {
        res.status(400).json({ message: 'No user found with that username.'});
        return;
    }
    const validPassword = UserData.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password'});
        return;
    }
    req.session.save(() => {
        req.session.user_id = UserData.id;
        req.session.username = UserData.username;
        req.session.loggedIn = true;
        
        res.json({ user: UserData, message: 'You are now logged In'});
    });
 })
 .catch(err => {
    console.log(err);
    res.status(500).json(err);
 });
 
});

router.post('/logout', (req, res) => {
    if (req.sess.loggedIn) {
        req.session.destroy(() => {
            //end() important to avoid  app from stalling
            res.status(204).json({ message: " You are logout."}).end();
        });
    } else {
        res.status(400).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req, body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(UserData => {
        if (!UserData[0]) {
            res.status(404).json({ message: 'No user found with this ID.'});
            return;
        }
        res.json(UserData);
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(UserData => {
        if (!UserData) {
            res.status(404).json({message: 'No user found with this ID.'});
            return;
        }
        res.json(UserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports =router;