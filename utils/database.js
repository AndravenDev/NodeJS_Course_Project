// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node_connection", "root", "loler123", {
//   host: "localhost",
//   dialect: "mysql"
// });

// module.exports = sequelize; 

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect('mongodb+srv://jax:loler123@atlascluster.3paxgym.mongodb.net/shop?retryWrites=true&w=majority')
  .then((client) => {
    _db = client.db();
    cb();
  })
  .catch(err => console.log(err));
}

const getDb = () => {
  if(_db){
    return _db;
  }
  throw "No database"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
