const Message = require('../models/message');

async function getMessageData(req) {
    if (req.user) {
        const messages = await Message.findAll({ where: { email: req.user.email } });
        return { messages, messageCount: null };
    }
    const messageCount = await Message.count();
    return { messages: null, messageCount };
}

async function showContactForm(req, res) {
    const { messages, messageCount } = await getMessageData(req);
    res.render('contact', { title: 'Contact', submitted: false, messages, messageCount });
}

async function submitContactForm(req, res) {
    const { message } = req.body;
    const name = req.user ? req.user.name : req.body.name;
    const email = req.user ? req.user.email : req.body.email;
    await Message.create({ name, email, message });
    const { messages, messageCount } = await getMessageData(req);
    res.render('contact', { title: 'Contact', submitted: true, name, messages, messageCount });
}

module.exports = { showContactForm, submitContactForm };
