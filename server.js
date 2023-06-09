if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const path = require('path');
const https = require('https');
const express = require('express');
const app = express();
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

// const errorHandler = require('./middlewares/errorHandler');

const passport = require('./config/passport-config');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const exressLayout = require('express-ejs-layouts');

const viewsCount = require('./middlewares/count-views');
const errorHandler = require('./middlewares/error-handlers');

const mongoose = require('mongoose');
const helmet = require('helmet');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (e)=>console.log(e));
db.once('open', ()=>{
    console.log("Connected to db");
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');


app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["self"],
        scriptSrc: ["self", "https://cdn.jsdelivr.net", "https://127.0.0.1:3000/scripts/script.js"],
    }
    
}))

app.use(methodOverride('_method'));
app.use(exressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 1000*60*60*24
    },
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL, collectionName: 'sessions'})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// app.use(viewsCount.countViews);

// app.use((req, res, next)=>{
//     console.log(req.user);

//     // console.log(req.session);
 
//     // console.log(res.headersSent);
//     next();
// })

// app.get('/', (req, res)=>{
//     if(req.isAuthenticated()){
//         res.render('index', {user: req.user});
//     }
//     else{
//         res.render('index');
//     }
// })
app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/account/signUp'));
app.use('/auth/login', require('./routes/account/login'));
app.use('/auth/google', require('./routes/account/google'));
app.use('/logout', require('./routes/account/logout'));

app.use('/user', require('./routes/user'));
app.use('/articles', require('./routes/articles'));

app.use((req, res) => {
    res.status(404).render('404', {user: req.user});
});

app.use(errorHandler);
// app.use((err, req, res, next)=>{
//     console.log(err);
//     res.status(500).json({error: err.message});
// });



const server = https.createServer({
    key: process.env.CERT_PRIV_KEY,
    cert: process.env.CERT
}, app)



server.on('error', (e)=>{
    console.log(e);
})

server.listen(process.env.PORT || 3000);