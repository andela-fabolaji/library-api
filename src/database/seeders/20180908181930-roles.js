module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        title: 'admin',
        permissions: [1,2,3,4,5,6,7,8,9,10],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'author',
        permissions: [1, 2, 3, 4, 5, 8, 10],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'reader',
        permissions: [4, 5, 8, 10],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
