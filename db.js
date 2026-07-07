const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    // storage: ':memory:', // to just use RAM
});

module.exports = db;