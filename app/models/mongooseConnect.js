const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Logger = require('mongodb').Logger;
// let ObjectID = require('mongodb').ObjectID;

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/shopitem';
let connect = MongoClient.connect(url);
mongoose.connect(url);

mongoose.set('debug', true);

const Item = require('./schema');


module.exports = {
  // ObjectID,
  connect,
  Item,
  close: () => {
    connect.then(db => db.close());
    mongoose.disconnect();
  }
};
