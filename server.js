require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./passport');

const routes = require('./app/routes');
const { db } = require('./app/models');
const { generateCsrfToken, verifyCsrfToken } = require('./app/middleware');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.csrfToken = generateCsrfToken(req);
    next();
});

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'app', 'views', 'pages'),
]);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(verifyCsrfToken);

app.use('/', routes);

const PORT = process.env.PORT || 3000;

if (!process.env.SESSION_SECRET) {
    console.warn('Warning: SESSION_SECRET is not set. Run "npm run init" to generate a .env file.');
}

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});