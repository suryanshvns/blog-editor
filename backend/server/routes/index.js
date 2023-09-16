const express = require('express');

const router = express.Router();
const pingRoutes = require('./ping');
const healthCheckRoutes = require('./health-check');

pingRoutes(router);
healthCheckRoutes(router);

module.exports = router;
