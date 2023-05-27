const fakeSpotImage = require('./spotImage.js');

let spotImages = []

for (let i = 0; i < 104 ; i++) {
    for (let j = 0; j < 5; j++) {
        const newSpotImage = fakeSpotImage()
        newSpotImage.spotId = i + 1
        if (j === 1) newSpotImage.preview = true
        
        spotImages.push(newSpotImage)
       
    }

}

module.exports = spotImages
