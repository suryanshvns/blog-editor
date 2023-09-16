const { v1: uuidV1 } = require('uuid');

const { file: FileModel } = require('../../database');

const aws = require('./aws');

const Helper = require('../../utils/helper');

const upload = async (payload, { access }) => {
  const { files, createdBy } = payload;
  let publicIds = '';
  let imageUrls = '';

  await Promise.all(files.map(async (file) => {
    const {
      originalname: originalName, buffer, size, versionId, mimetype,
    } = file;

    const extension = originalName.split('.').pop();
    const mimeType = mimetype || `application/${extension}`;

    const fileName = `${uuidV1()}-${originalName}`;

    const output = await aws.uploadFile({
      fileName, buffer, access, mimeType,
    });

    const { imageUrl, bucketName } = output;

    const publicId = uuidV1();

    await FileModel.create({
      original_name: originalName,
      file_name: fileName,
      size,
      version_id: versionId,
      image_url: imageUrl,
      mime_type: mimeType,
      created_by: createdBy,
      public_id: publicId,
      bucket_name: bucketName,
    });
    publicIds = `${publicIds},${publicId}`;
    imageUrls = `${imageUrls},${imageUrl}`;

    return { publicId, imageUrl };
  }));

  return {
    doc: { publicIds: publicIds.replace(',', ''), imageUrls: imageUrls.replace(',', '') },
  };
};

const getFileInformation = async (payload) => {
  const { fileId } = payload;
  const response = await FileModel.findOne({
    where: { public_id: fileId },
    attributes: [ 'public_id', [ 'bucket_name', 'bucketName' ],
      [ 'original_name', 'originalName' ], [ 'file_name', 'fileName' ], 'size', 'image_url', 'mime_type', 'created_by' ],
  });

  if (response) {
    const { dataValues } = response;
    const doc = Helper.convertSnakeToCamel(dataValues);

    return { doc };
  }

  return {};
};

const getFileObject = async (payload) => {
  const { fileId } = payload;
  const response = await FileModel.findOne({
    where: { public_id: fileId },
    attributes: [ [ 'bucket_name', 'bucketName' ], [ 'image_url', 'imageUrl' ], [ 'file_name', 'fileName' ], [ 'mime_type', 'mimeType' ],
      [ 'original_name', 'originalName' ], 'size' ],
  });

  if (response) {
    const {
      dataValues: {
        fileName, originalName, mimeType, bucketName, size,
      },
    } = response;
    const file = await aws.getFileObject(fileName, bucketName);

    return {
      doc: {
        file, mimeType, fileName, originalName, size,
      },
    };
  }

  return {};
};

const getSignedUrl = async (payload) => {
  const { fileId, expiry } = payload;
  const response = await FileModel.findOne({
    where: { public_id: fileId },
    attributes: [ [ 'bucket_name', 'bucketName' ], [ 'image_url', 'imageUrl' ], [ 'file_name', 'fileName' ], [ 'mime_type', 'mimeType' ],
      [ 'original_name', 'originalName' ], 'size' ],
  });

  if (response) {
    const {
      dataValues: {
        fileName, bucketName, originalName, mimeType, size,
      },
    } = response;

    const signedUrl = await aws.getSignedUrl(fileName, bucketName, expiry);

    return {
      doc: {
        originalName, mimeType, size, signedUrl,
      },
    };
  }

  return {};
};

module.exports = {
  upload, getFileInformation, getFileObject, getSignedUrl,
};
