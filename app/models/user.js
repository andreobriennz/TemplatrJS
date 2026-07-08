// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
import Message from '../models/message';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Message.belongsTo(User, { foreignKey: 'messageId' });

module.exports = User;