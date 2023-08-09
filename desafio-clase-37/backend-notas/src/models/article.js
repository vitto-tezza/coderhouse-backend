"use strict";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  description: String,
  price: String,
});

module.exports = mongoose.model("Article", ArticleSchema);
