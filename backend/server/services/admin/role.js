const { v1: uuidv1 } = require('uuid');

const {
  role: RoleModel,
} = require('../../database');
const Helper = require('../../utils/helper');

const save = async (payload) => {
  const {
    name, createdBy,
  } = payload;

  const publicId = uuidv1();

  const data = {
    public_id: publicId,
    name,
    slug: Helper.convertToSlug(name),
    created_by: createdBy,
  };

  const response = await RoleModel.create(data);

  if (response) {
    return { doc: { message: 'details saved successfully', publicId } };
  }

  return { doc: { message: "details didn't saved" } };
};

module.exports = {
  save,
};
