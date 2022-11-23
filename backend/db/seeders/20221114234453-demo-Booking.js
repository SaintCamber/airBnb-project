let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = "Bookings"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [{
      id:1,
      spotId:1,
      userId:2,
      startDate:new Date(),
      endDate: new Date('December 17, 2022')
    },
    {
      id:2,
      spotId:1,
      userId:1,
      startDate:new Date(),
      endDate: new Date('December 18, 2022')
    },
    {
      id:3,
      spotId:3,
      userId:1,
      startDate:new Date(),
      endDate: new Date('December 19, 2022')
    },
    {
      id:4,
      spotId:1,
      userId:3,
      startDate:new Date(),
      endDate: new Date('December 25, 2022')
    },
    {
      id:5,
      spotId:1,
      userId:2,
      startDate:new Date(),
      endDate: new Date('December 30, 2022')
    },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    
    return queryInterface.bulkDelete(options, {
      id: [1,2,3,4,5]
    }, {});
  }
};