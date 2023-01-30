const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config() 

const schema = process.env.DB_SCHEMA 
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST

const sequelize = new Sequelize(schema, username, password, {
    host: host,
    dialect:'mysql',
    logging: false,
});

const Data = sequelize.define('data', {
   title : {type: DataTypes.STRING},
   message : {type: DataTypes.TEXT},
   receiver : {type: DataTypes.STRING},
}, {
    freezeTableName: true
});


module.exports = Data ;


