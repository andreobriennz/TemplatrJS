const { DataTypes } = require('sequelize');
const db = require('../../db');
const User = require('../models/user');

const Message = db.define('Message', {
    name: DataTypes.STRING,
    message: DataTypes.STRING,
});

module.exports = Message;