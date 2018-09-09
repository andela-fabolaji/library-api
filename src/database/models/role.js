
const roleModel = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    title: {
      type: DataTypes.ENUM,
      values: ['admin', 'author', 'reader'],
      allowNull: false,
      unique: true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    }
  }, {});
  Role.associate = (models) => {
    Role.hasMany(models.user, {
      foreignKey: 'roleId'
    });
  };
  return Role;
};

export default roleModel;
