const bcrypt = require('bcrypt');
const passport = require('../../passport');
const User = require('../models/user');

function showRegisterForm(req, res) {
  res.render('register', { title: 'Register', error: null });
}

async function register(req, res) {
  const { email, password, name } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash, name });
    res.redirect('/login');
  } catch (err) {
    const message = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
    res.render('register', { title: 'Register', error: message });
  }
}

function showLoginForm(req, res) {
  res.render('login', { title: 'Login', error: null });
}

function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render('login', { title: 'Login', error: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
}

module.exports = { showRegisterForm, register, showLoginForm, login, logout };