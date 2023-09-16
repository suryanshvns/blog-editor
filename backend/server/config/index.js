const { version, name } = require('../package.json');

module.exports = {
  VERSION: process.env.VERSION || version,
  NAME: process.env.NAME || name,
  DOMAIN: process.env.DOMAIN || 'http://localhost:3000',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  DATABASE: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      freezeTableName: true,
      define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30 * 1000,
        idle: 10000,
      },
      dialectOptions: {
        decimalNumbers: true,
        charset: 'utf8mb4',
      },
      logging: false,
    },
  },
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || 'RH7DvLX5Xa1gRscXirPhKk1amG2tJ/TfnoZhlwbE',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || 'AKIAYPFWKMH37BDSXGMB',
  S3_REGION: process.env.S3_REGION || 'ap-south-1',
};
