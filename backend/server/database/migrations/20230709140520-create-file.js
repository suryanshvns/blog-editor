module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('file', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    public_id: {
      type: Sequelize.UUID,
      allowNull: false,
      index: true,
      unique: true,
    },
    mime_type: Sequelize.STRING,
    original_name: Sequelize.STRING,
    file_name: Sequelize.STRING,
    size: Sequelize.INTEGER,
    version_id: Sequelize.STRING,
    image_url: Sequelize.STRING,
    bucket_name: Sequelize.STRING,
    created_by: { type: Sequelize.UUID, index: true, allowNull: false },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('file'),
};
