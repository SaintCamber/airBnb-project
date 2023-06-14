const fakeBooking = require('./booking.js');



    let bookings = []
    for (let i = 0; i < 20; i++) {
        newBooking = fakeBooking()
        bookings.push(newBooking)
    }

    module.exports = bookings
