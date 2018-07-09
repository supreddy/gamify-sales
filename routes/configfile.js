const express = require('express');
const Shop = require('../models/Shop');
const Shopify = require('shopify-node-api');
const config = require('../config');
var fs = require('fs');
var path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
  const params = req.body;
  const query = Shop.findOne({ shopify_domain: params.config.shop }).exec();
  query.then((result) => {
    const shop = result;
    const configFileName = `../views/${shop.shopId}_config.json`;
    const filePath = path.join(__dirname, configFileName);
    const configData = req.body;

    fs.writeFile(filePath, JSON.stringify(configData), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Config file was saved!");
        res.sendStatus(200);
    }); 
  });

});

router.get('/', (req, res) => {
  const params = req.query;
  const query = Shop.findOne({ shopify_domain: params.shop }).exec();
  query.then((result) => {
    const shop = result;
    const configFileName = `../views/${shop.shopId}_config.json`;
    const filePath = path.join(__dirname, configFileName);

    fs.readFile(filePath, (err, data) => {  
        if (err) throw err;
        return res.status(200).send(JSON.parse(data));
    });
  });

});

module.exports = router;