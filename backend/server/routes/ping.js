const Ping = require('../controllers/ping');

module.exports = (router) => {
  router.get('/ping', Ping.status);
};
