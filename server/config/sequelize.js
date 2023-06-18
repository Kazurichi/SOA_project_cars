const Sequelize = require("sequelize");
require("dotenv").config();
const db = new Sequelize(
  process.env.DATABASE, // DB_NAME
  process.env.USER, // DB_USER
  process.env.PASSWORD, // DB_PASSWORD
  {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    timezone: "+07:00",
  }
);


module.exports = {
  initDB: () => {
    return db.authenticate();
  },
  getDB: () => {
    return db;
  },
};
