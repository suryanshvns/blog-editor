const {
  save, get, patch, getDraftedList, getSubmittedList,
} = require('../../controllers/customer/blog');
const { verifyJWT } = require('../../controllers/customer/auth');
const { hasRole } = require('../../utils/helper');

module.exports = (router) => {
  router.post('/content', verifyJWT, hasRole([ 'customer' ]), save);
  router.get('/contents/posted', getSubmittedList);
  router.get('/contents/draft', verifyJWT, getDraftedList);
  router.get('/content', get);
  router.patch('/content/:publicId/update', verifyJWT, patch);
};
