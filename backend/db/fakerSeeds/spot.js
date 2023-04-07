const faker=require('faker')
        
        module.exports = ()=>({ownerId: Math.floor(Math.random() * 100) + 1,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        price: Math.floor(Math.random() * 10000),})