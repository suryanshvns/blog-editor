const { v1: uuidv1 } = require('uuid');

const {
  blog: BlogModel,
} = require('../../database');
const Helper = require('../../utils/helper');

const save = async (payload) => {
  const {
    title, content, status, image, createdBy,
  } = payload;

  const publicId = uuidv1();

  const data = {
    user_id: createdBy,
    title,
    content,
    image,
    status: status || 'draft',
    public_id: publicId,
    created_by: createdBy,
  };

  const response = await BlogModel.create(data);

  if (response) {
    return { doc: { message: 'details saved successfully', publicId } };
  }

  return { doc: { message: "details didn't saved" } };
};

const patch = async (payload) => {
  const {
    title, content, status, image, publicId,
  } = payload;

  const data = {
    title,
    content,
    image,
    status: status || 'draft',
  };

  const response = await BlogModel.update(data, { where: { public_id: publicId } });

  if (response) {
    return { doc: { message: 'details updated successfully' } };
  }

  return { doc: { message: "details didn't updated" } };
};

const getList = async (payload) => {
  const { status } = payload;
  const response = await BlogModel.findAndCountAll({
    attributes: [ 'public_id', 'title', 'content', 'image' ],
    where: { status },
  });

  if (response) {
    const { rows, count } = response;
    const doc = rows.map((i) => Helper.convertSnakeToCamel(i.dataValues));

    return { doc, count };
  }

  return { doc: [], count: 0 };
};

const get = async (payload) => {
  const { publicId } = payload;

  const response = await BlogModel.findOne({
    attributes: [ 'title', 'content', 'image' ],
    where: { public_id: publicId },
  });

  if (response) {
    const { dataValues } = response;
    const doc = Helper.convertSnakeToCamel(dataValues);

    return { doc };
  }

  return { doc: {} };
};

module.exports = {
  save,
  getList,
  get,
  patch,
};
