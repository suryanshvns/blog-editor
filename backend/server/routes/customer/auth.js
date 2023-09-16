const {
  registration, login, me, verifyJWT,
} = require('../../controllers/customer/auth');

module.exports = (router) => {
  router.post('/login', login);
  router.post('/registration', registration);
  router.get('/me', verifyJWT, me);
};
