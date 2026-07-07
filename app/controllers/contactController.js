const Message = require('../models/message');

async function showContactForm(req, res) {
    const messages = await Message.findAll();
    res.render('contact', { title: 'Contact', submitted: false, messages: messages });
}

async function submitContactForm(req, res) {
    const { message } = req.body;
    const name = req.user ? req.user.name : req.body.name;
    const email = req.user ? req.user.email : req.body.email;

    await Message.create({ name, email, message });
    const messages = await Message.findAll();
    res.render('contact', { title: 'Contact', submitted: true, name, messages });
}

module.exports = { showContactForm, submitContactForm };