const fakeReview = require('./review.js');

let reviews = []

for (let i = 0; i < 20; i++) {
    for(let j = 0; j < 5; j++){
    const newReview = fakeReview()
    newReview.spotId = i + 1
    reviews.push(newReview)
}
}

module.exports = reviews
