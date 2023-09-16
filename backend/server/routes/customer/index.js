const express = require('express');

const router = express.Router();
const contentRoutes = require('./blog');
const adminAuthRoutes = require('./auth');
const fileRoutes = require('./file');

contentRoutes(router);
adminAuthRoutes(router);
fileRoutes(router);

module.exports = router;
