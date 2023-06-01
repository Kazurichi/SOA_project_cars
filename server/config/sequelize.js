const Sequelize = require("sequelize");
const config=require("./key");
const db = new Sequelize(
  config.database, // DB_NAME
  config.username, // DB_USER
  config.password, // DB_PASSWORD
  {
    host: config.host,
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
