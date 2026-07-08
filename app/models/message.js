const { DataTypes } = require('sequelize');
const db = require('../../db');
import User from '../models/user';

const Message = db.define('Message', {
    message: DataTypes.STRING,
});

Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = Message;