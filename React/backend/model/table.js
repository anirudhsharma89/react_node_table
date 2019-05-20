const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Table = new Schema(
  {
    id: {
      type: Number
    },
    category: {
      type: String
    },
    price: {
      type: Number
    },
    qty: {
      type: Number
    },
    name: {
      type: String
    }
  },
  {
    collection: "table"
  }
);

module.exports = mongoose.model("Table", Table);
