const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
    console.log('.env already exists — leaving it as is.');
    process.exit(0);
}

const sessionSecret = crypto.randomBytes(32).toString('hex');

const contents = `SESSION_SECRET=${sessionSecret}\nPORT=3000\n`;

fs.writeFileSync(envPath, contents);
console.log('Created .env with a generated SESSION_SECRET.');
