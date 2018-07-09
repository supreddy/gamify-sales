const express = require('express');
const Shop = require('../models/Shop');
const Discounts = require('../models/Discounts');
const Shopify = require('shopify-node-api');
const config = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  const params = req.query;
  console.log(params.shop);
  const query = Shop.findOne({ shopify_domain: params.shop }).exec();
  query.then((result) => {
    const shop = result;
    const shopAPI = new Shopify({
      shop: params.shop, // MYSHOP.myshopify.com
      shopify_api_key: config.SHOPIFY_API_KEY, // Your API key
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET, // Your Shared Secret
      access_token: result.accessToken, //permanent token
    });

    // admin/price_rules.json
    shopAPI.get('/admin/price_rules.json', function(err, data, headers) {
      const codes=[];
      //console.log(data); // Data contains product json information
      for(var index = 0; index < data.price_rules.length; index++) {
          console.log(data.price_rules[index].title);
          codes[index] = data.price_rules[index].title;
      }

      discounts = new Discounts();
      discounts.shopify_domain = params.shop;
      discounts.codes = codes;
      // console.log(headers); // Headers returned from request
      discounts.save((saveError) => {
        if (saveError) {
          console.log('Cannot save discounts: ', saveError);
          res.redirect('/error');
        } else {
          return res.status(200).send(codes);
        }
      });
    });
  });

});

module.exports = router;