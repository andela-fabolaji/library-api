import bcrypt from 'bcryptjs';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'field can only contain alphabets'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'field can only contain alphabets'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM(DataTypes.INTEGER),
      values: [0, 1],
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'can only be 0 | 1'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format! Trying using the format user@email.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM(DataTypes.STRING),
      values: ['active', 'suspended', 'deleted'],
      defaultValue: 'active',
    },
  }, {});
  
  User.associate = models => {
    User.belongsTo(models.role);
  };

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  User.beforeUpdate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  return User;
};

export default userModel;