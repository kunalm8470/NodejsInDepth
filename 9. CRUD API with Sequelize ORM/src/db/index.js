const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load all environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions
});

require('pg').types.setTypeParser(1114, stringValue => {
    return new Date(stringValue + '+0000');
});
