const aws = require('aws-sdk');

const { S3_SECRET_ACCESS_KEY, S3_ACCESS_KEY_ID, S3_REGION } = require('../../config');

aws.config.update({
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  accessKeyId: S3_ACCESS_KEY_ID,
  region: S3_REGION,
});
const s3 = new aws.S3();

const uploadFile = async (payload) => {
  const {
    fileName, buffer, bucketName, access, mimeType,
  } = payload;

  const output = await new Promise((resolve, reject) => {
    s3.upload({
      Bucket: bucketName || access === 'public' ? 'aahsp-bucket/public-doc' : 'aahsp-bucket/private-doc',
      Key: `${fileName}`,
      Body: buffer,
      ACL: access === 'public' ? 'public-read' : 'private',
      ContentType: mimeType,
      Tagging: `name=${fileName}`,
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    }, (err, response) => {
      if (err) {
        return reject(err);
      }
      const { Location: imageUrl } = response;

      return resolve({
        imageUrl,
        bucketName: bucketName || access === 'public' ? 'blog-me/public-doc' : 'blog-me/documents',
      });
    });
  });

  return output;
};

const getFileObject = async (key, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const response = await new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      const { Body: file } = data;

      return resolve(file);
    });
  });

  return response;
};

const getSignedUrl = async (key, bucketName, expiryInMinutes) => {
  const expiryInseconds = expiryInMinutes * 60;

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiryInseconds,
  };

  const signedUrl = s3.getSignedUrl('getObject', params);

  return signedUrl;
};

module.exports = {
  uploadFile, getFileObject, getSignedUrl,
};
