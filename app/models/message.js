const { DataTypes } = require('sequelize');
const db = require('../../db');

const Message = db.define('Message', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
});

module.exports = Message;