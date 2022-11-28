const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_connection", "root", "loler123", {
  host: "localhost",
});

module.exports = sequelize;
