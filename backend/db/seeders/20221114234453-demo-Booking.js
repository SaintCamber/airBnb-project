

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [{
      spotId:1,
      userId:2,
      startDate:new Date(),
      endDate: new Date('December 17, 2022')
    },
    {
      spotId:1,
      userId:1,
      startDate:new Date(),
      endDate: new Date('December 18, 2022')
    },
    {
      spotId:3,
      userId:1,
      startDate:new Date(),
      endDate: new Date('December 19, 2022')
    },
    {
      spotId:1,
      userId:3,
      startDate:new Date(),
      endDate: new Date('December 25, 2022')
    },
    {
      spotId:1,
      userId:2,
      startDate:new Date(),
      endDate: new Date('December 30, 2022')
    },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    let options = {}
     options.tableName = "Bookings"
    return queryInterface.bulkDelete('Bookings', {
      userId: [1,2,3]
    }, {});
  }
};