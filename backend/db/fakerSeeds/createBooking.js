const fakeBooking = require('./booking.js');



    let bookings = []
    for (let i = 0; i < 500; i++) {
        newBooking = fakeBooking()
        bookings.push(newBooking)
    }

    module.exports = bookings
