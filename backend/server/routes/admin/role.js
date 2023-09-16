const {
  save,
} = require('../../controllers/admin/role');
// const { verifyJWT } = require('../../controllers/admin/auth');

module.exports = (router) => {
  router.post('/role', save);
};
