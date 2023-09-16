module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define(
    'file',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      public_id: {
        type: DataTypes.UUID,
        allowNull: false,
        index: true,
        unique: true,
      },
      mime_type: DataTypes.STRING,
      original_name: DataTypes.STRING,
      file_name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      version_id: DataTypes.STRING,
      image_url: DataTypes.STRING,
      bucket_name: DataTypes.STRING,
      created_by: { type: DataTypes.UUID, index: true, allowNull: false },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    },

  );

  return file;
};
