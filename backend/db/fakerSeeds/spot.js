const faker=require('faker')
        
        module.exports = ()=>({ownerId: Math.floor(Math.random() * 100) + 1,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
        name: faker.company.companyName(),
        description: "this is the default description for seed files add in response to a bug related to the length of the input provided by the random seed data generator used",
        price: Math.floor(Math.random() * 10000),})