const mongoose = require('mongoose');
const Counter = require('./Counter');


const Discounts = mongoose.Schema({
  shopId: Number,
  shopify_domain: String, // Shopify domain without the .myshopify.com on the end.
  codes: [String],
});

module.exports = mongoose.model('Discounts', Discounts);
