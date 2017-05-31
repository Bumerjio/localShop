const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.Promise = global.Promise;
let itemsSchema = new Schema({
    name_dress: String,
    description: String,
    price: Number,
    article: {
      type: String,
      index: {unique: true }
    },
    url_images: [String]
});

// const Item = mongoose.model("Item", itemsSchema);

module.exports = mongoose.model("Item", itemsSchema);
