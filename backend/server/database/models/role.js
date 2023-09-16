module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      name: { type: DataTypes.STRING, unique: false, allowNull: false },
      slug: { type: DataTypes.STRING, unique: true, allowNull: false },
      created_by: { type: DataTypes.UUID, allowNull: true },
      updated_by: { type: DataTypes.UUID, allowNull: true },
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

  return role;
};
