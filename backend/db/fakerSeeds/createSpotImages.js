const fakeSpotImage = require('./spotImage.js');

let Images = []

for (let i = 0; i < 20 ; i++) {
    for (let j = 0; j < 5; j++) {
        const newSpotImage = fakeSpotImage()
        newSpotImage.spotId = i + 1
        if (j === 1) {
          newSpotImage.preview = true
        } else {
          newSpotImage.preview = false
        }
        
        Images.push(newSpotImage)
       
    }

}

module.exports = Images
