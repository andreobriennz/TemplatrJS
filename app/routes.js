const express = require('express');
const contactController = require('./controllers/contactController');
const authController = require('./controllers/authController');
const { requireAuth } = require('../middleware');

const router = express.Router();

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.register);
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/contact', contactController.showContactForm);
router.post('/contact', contactController.submitContactForm);

module.exports = router;