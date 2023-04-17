const faker=require('faker')

module.exports=()=>({
    userId: Math.floor(Math.random() * 100) + 1,
    spotId: Math.floor(Math.random() * 100) + 1,
    review: faker.lorem.sentence(1),
    stars: Math.floor(Math.random() * 5) + 1,
})