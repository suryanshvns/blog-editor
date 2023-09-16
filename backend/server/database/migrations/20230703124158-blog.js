module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('blog', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
    created_by: { type: DataTypes.UUID },
    updated_by: { type: DataTypes.UUID },
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
  }),
  down: (queryInterface) => queryInterface.dropTable('blog'),
};
