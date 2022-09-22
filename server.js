const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs =require('express-handlebars');
const helpers = require('./utils/helpers');

const sequelize =  require('./config/connection');
const SequilizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secret',
    cookie:{},
    resave: false,
    saveUninitialized: true,
    store: new SequilizeStore({
        db:sequelize
    })
};

app.use(session(sess));
const hbs =exphbs.create({helpers});
//set handdlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//setup express to parse json data
app.use(express.json());
//tell express to accept url data
app.use(express.urlencoded({extended:false}));
//express to use the public folder as the root
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
    console.log('App listening on port localhost:${PORT}');
    sequelize.sync({force: false});
});