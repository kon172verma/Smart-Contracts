const routes = require('next-routes')();
routes.add('/campaigns/:address', '/campaigns/campaign');
module.exports = routes;