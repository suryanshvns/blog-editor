// const axios = require('axios');
const { v1: uuidv1 } = require('uuid');
const jwt = require('jsonwebtoken');
const {
  user: UserModel, role: RoleModel,
} = require('../../database');
const Helper = require('../../utils/helper');

const createJWT = (data) => {
  const token = jwt.sign(data, 'jafhaiofhsj');

  return token;
};

const verifyJWT = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  const decoded = jwt.verify(token, 'jafhaiofhsj');

  return decoded;
};

const registration = async (payload) => {
  const {
    name, email, mobileNumber, password,
  } = payload;

  const userType = 'admin';

  const roleExist = await RoleModel.findOne({
    where: { slug: userType },
  });

  if (roleExist) {
    const { dataValues: { public_id: publicId } } = roleExist;
    const data = {
      name, email, mobile_number: mobileNumber, password, public_id: uuidv1(), role_id: publicId, user_type: userType,
    };

    const isUserExist = await UserModel.findOne({
      where: { email },
    });

    if (!isUserExist) {
      const response = await UserModel.create(data);

      if (response) {
        return { doc: { message: 'successfully saved' } };
      }
    }
  }

  return { doc: { message: 'user already exist' } };
};

const login = async (payload) => {
  const { email, password } = payload;
  const isUserExist = await UserModel.findOne({
    where: { email },
  });

  if (isUserExist) {
    const {
      dataValues: {
        password: savePassword, name, mobile_number: mobileNumber, public_id: publicId, role_id: roleId, user_type: userType,
      },
    } = isUserExist;

    if (password === savePassword) {
      const data = {
        name, mobileNumber, userId: publicId, email, roleId, userType,
      };
      const token = createJWT(data);

      return { doc: { isLoggedin: true, token, message: 'logged in successfully' } };
    }

    return { doc: { isLoggedin: false, message: 'incorrect password' } };
  }

  return { errors: [ { key: 'username', messages: 'user or password is wrong' } ] };
};

const me = async (payload) => {
  const { email } = payload;
  const response = await UserModel.findOne({
    attributes: [ 'public_id', 'mobile_number', 'name', 'email' ],
    where: { email },
  });

  if (response) {
    const { dataValues } = response;
    const doc = Helper.convertSnakeToCamel(dataValues);

    return { doc };
  }

  return { doc: {} };
};

module.exports = {
  login, registration, me, verifyJWT,
};
