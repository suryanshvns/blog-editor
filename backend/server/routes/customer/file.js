const {
  upload, getFileInformation, download, view, getSignedUrl,
} = require('../../controllers/customer/file');
const {
  verifyJWT,
} = require('../../controllers/customer/auth');

module.exports = (router) => {
  router.post('/file', verifyJWT, upload);
  router.get('/file/:fileId', verifyJWT, getFileInformation);
  router.get('/file/:fileId/download', verifyJWT, download);
  router.get('/file/:fileId/view', verifyJWT, view);
  router.get('/file/:fileId/signed', verifyJWT, getSignedUrl);
};
