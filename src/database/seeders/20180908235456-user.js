const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          firstname: 'admin',
          lastname: 'user',
          gender: '0',
          roleId: 1,
          email: 'admin@republisher.com',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
          verified: true,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
