const { File: FileService } = require('../../services/customer');
const { fileUpload: fileUploadSchema, getFileInformation: getFileInformationSchema, downloadFile: downloadFileSchema } = require('../../dto-schemas/file');

const Validator = require('../../utils/validator');

const upload = async (req, res) => {
  try {
    const {
      body, user: { userId: createdBy }, files,
    } = req;
    const { access, ...newDoc } = body;

    const data = { ...newDoc, createdBy, files };

    const { errors } = Validator.isSchemaValid({ data, schema: fileUploadSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }

    const { error: err, doc } = await FileService.upload(data, { access });

    if (doc) {
      const { publicIds, imageUrls } = doc;

      res.setHeader('public-id', publicIds);
      res.setHeader('image-url', imageUrls);

      return res.postRequest();
    }

    return res.badRequest('field-validation', err);
  } catch (error) {
    return res.serverError(error);
  }
};

const getFileInformation = async (req, res) => {
  try {
    const { params: { fileId } } = req;

    const data = { fileId };

    const { errors } = Validator.isSchemaValid({ data, schema: getFileInformationSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }
    const { doc } = await FileService.getFileInformation(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

const download = async (req, res) => {
  try {
    const { params: { fileId } } = req;

    const data = { fileId };

    const { errors } = Validator.isSchemaValid({ data, schema: downloadFileSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }
    const { doc } = await FileService.getFileObject(data);

    if (doc) {
      const { file, fileName, mimeType } = doc;

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-disposition', `attachment;filename=${fileName}`);

      res.write(file);

      return res.end();
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

const view = async (req, res) => {
  try {
    const { params: { fileId } } = req;

    const data = { fileId };

    const { errors } = Validator.isSchemaValid({ data, schema: downloadFileSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }
    const { doc } = await FileService.getFileObject(data);

    if (doc) {
      const {
        file, fileName, mimeType, originalName, size,
      } = doc;

      res.setHeader('Content-Type', mimeType);
      res.setHeader('File-Name', originalName);
      res.setHeader('File-Size', size);
      res.setHeader('Content-disposition', `inline; filename=${fileName}`);

      return res.send(file);
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

const getSignedUrl = async (req, res) => {
  try {
    const { params: { fileId }, headers: { expiry = 30 } } = req;

    const data = { fileId, expiry: parseFloat(expiry) };

    const { errors } = Validator.isSchemaValid({ data, schema: downloadFileSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }
    const { doc } = await FileService.getSignedUrl(data);

    if (doc) {
      const {
        originalName, size,
      } = doc;

      res.setHeader('File-Name', originalName);
      res.setHeader('File-Size', size);

      return res.getRequest(doc);
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports = {
  upload, getFileInformation, download, view, getSignedUrl,
};
