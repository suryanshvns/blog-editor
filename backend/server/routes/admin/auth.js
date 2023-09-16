const {
  registration, login, me, verifyJWT,
} = require('../../controllers/admin/auth');

module.exports = (router) => {
  router.post('/registration', registration);
  router.post('/login', login);
  router.get('/me', verifyJWT, me);
};
