const express = require('express');

const router = express.Router();
const adminAuthRoutes = require('./auth');
const roleRoutes = require('./role');

adminAuthRoutes(router);
roleRoutes(router);

module.exports = router;
