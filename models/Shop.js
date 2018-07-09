const mongoose = require('mongoose');
const Counter = require('./Counter');


const Shop = mongoose.Schema({
  shopId: Number,
  shopify_domain: String, // Shopify domain without the .myshopify.com on the end.
  domain: String,
  supportEmail: String,
  nonce: String,
  accessToken: String,
  isActive: { type: Boolean, default: false },
});

Shop.pre('save', function(next) {
    var doc = this;
    Counter.findOneAndUpdate({entity: 'shopEntity'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        if(counter)
        	doc.shopId = counter.seq;
        next();
    });
});

module.exports = mongoose.model('Shop', Shop);
