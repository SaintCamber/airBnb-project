const Spot = require('./spot.js');


    let spots = []

    for (let i = 0; i < 100; i++) {
        newSpot = Spot()
        spots.push(newSpot)

    }

    module.exports = spots