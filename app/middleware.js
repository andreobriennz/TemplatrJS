const crypto = require('crypto');

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function generateCsrfToken(req) {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }
    return req.session.csrfToken;
}

function verifyCsrfToken(req, res, next) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
    if (!req.session.csrfToken || req.body._csrf !== req.session.csrfToken) {
        return res.status(403).send('Invalid CSRF token');
    }
    next();
}

module.exports = { requireAuth, generateCsrfToken, verifyCsrfToken };
