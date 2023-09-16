module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    mobile_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: {
      type: DataTypes.STRING, unique: true, allowNull: false, index: true,
    },
    password: { type: DataTypes.STRING, unique: false, allowNull: false },
    role_id: { type: DataTypes.UUID, unique: false, allowNull: false },
    user_type: { type: DataTypes.STRING, unique: false, allowNull: false },
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
  down: (queryInterface) => queryInterface.dropTable('user'),
};
