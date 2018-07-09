const env = process.env.NODE_ENV;
const production = require('./production');
const development = require('./development');

// You should put any global variables in here.
const config = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || '',
  SHOPIFY_SHARED_SECRET: process.env.SHOPIFY_SHARED_SECRET || '',
  APP_NAME: 'spintest-1',
  APP_STORE_NAME: 'spintest-1',
  APP_SCOPE: 'read_products,write_products,read_customers,write_customers,read_product_listings,read_price_rules,write_price_rules',
  DATABASE_NAME: 'heroku_97j8zt4v'
};

if (env !== 'PRODUCTION') {
  module.exports = Object.assign({}, config, development);
} else {
  module.exports = Object.assign({}, config, production);
}
