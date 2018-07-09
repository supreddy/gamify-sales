const express = require('express');
const Shop = require('../models/Shop');
const Discounts = require('../models/Discounts');
const Shopify = require('shopify-node-api');
const config = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  const params = req.query;
  const query = Shop.findOne({ shopify_domain: params.shop }).exec();
  query.then((result) => {
    const shop = result;
    const shopAPI = new Shopify({
      shop: params.shop, // MYSHOP.myshopify.com
      shopify_api_key: config.SHOPIFY_API_KEY, // Your API key
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET, // Your Shared Secret
      access_token: result.accessToken, //permanent token
    });

    var charge_data = {
      "recurring_application_charge": {
        "name": "Starter Plan",
        "price": 6.0,
        "return_url": "http://gamify-sale.shopifyapps.com",
        "test": true
      }
    };

    // setup a recurring charge plan
    shopAPI.post('/admin/recurring_application_charges.json', charge_data, function(err, data, headers) {
        console.log(data);
    });
  });

});

router.get('/activate', (req, res) => {
  const params = req.query;
  const query = Shop.findOne({ shopify_domain: params.shop }).exec();
  query.then((result) => {
    const shop = result;
    const shopAPI = new Shopify({
      shop: params.shop, // MYSHOP.myshopify.com
      shopify_api_key: config.SHOPIFY_API_KEY, // Your API key
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET, // Your Shared Secret
      access_token: result.accessToken, //permanent token
    });

    const activate_url = `/admin/recurring_application_charges/${params.id}/activate.json`;

    // Activate the plan to charge
    shopAPI.post(activate_url, function(err, data, headers) {
        console.log(data);
    });
  });

});

module.exports = router;