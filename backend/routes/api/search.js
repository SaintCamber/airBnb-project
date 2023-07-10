const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, SpotImage,Review,reviewImage,Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  validateNewSpot,
  isSpotOwnedByCurrentUser,
  validateReview,
  doesSpotExist,
  validateDates,
  validateQueryParameters
  
} = require("../../utils/checks");
const e = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // return res.json({ message: "hello" });
  const { startDate, endDate, location } = req.query;
  console.log("startDate",startDate)
  console.log("endDate",endDate)
  console.log("location",location)
  const startDateCheck =startDate ? new Date(startDate) : new Date();
  const endDateCheck = endDate ? new Date(endDate) : new Date(startDateCheck.getDate() + 3);
 //intended shape of location object for reference:
  // location: {
  //   city: "San Francisco",
  //   state: "California",
  //   country: "United States",
  //   lat: 37.7749295,
  //   lng: -122.4194155,
  // }
  // how i want to try sending the location object ^ but  since i want the front
  // end to be able to send it in the query params i need to figure out how to
  // send an object in the query params. i think i can just send it as a string
  // and then parse it on the backend. so i will try that. ok so i can send the
  // location object in the query params and then i can parse it on the backend
  // and then i can use the city property to search for spots in that city.
  // that's pretty solid for the spots that have a city state and country but
  // what if it's a) not in the US or b) not in a city? etc etc. so what would
  // the best way to handle that be? the lat and lng are always going to be
  // there so i could just use those to search for spots and since i want to
  // have those be a check no if an entered spot is a valid loctation i should
  // be able to have the frontend geocode the user entered location and send the
  // lat and lng to the database with the rest of the soot info when creating a
  // new spot which is the refatctor i need to do for that part of the spots
  // backend. so now here on the search route i can just have the fromntend
  // extract the location info i want from the geocoded location and send that
  // in the query params, which means back to seeing if/how i can send an object
  // in the query params.    that, question aside for now , once i have the
  // location info i want for querying the database for the search i need to
  // create the query, which would look like what ? uhm  well from the frontend
  // i need some info right? and the info is gonna be two datesa and a location
  // the dates i have covered it gets in as a parsed string converted to a date
  // for verification and used to search for available spots. the location is
  // currently just looking for a city but i want to be able to search for a
  // city that might not be in the database or geocoded and if we have a spot in
  // the area based on lat and lng then i want to be able to return that spot,
  // which means i need to have the lat and lng here and i need to be able to
  // calculate the distance between the lat and lng of the spot and possibly
  // nearby spots and then return the spots that are within a certain distance
  // of the searched location. basically i should be able to take a lat and lng
  // and then a second lat and lng and see how far apart they are.... which  i
  // mean should be like what ? find out the conversion from decimal of the
  // lat/lng to miles and then do some math to see how far apart they are? that
  // should be it in theory.
  // distance=acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371
  // supposedly that is the formula for calculating the distance between two lat
  // and lngs. so i take the lat and lng of the searched location and do what
  // with it ? i guess send it here and turn it into it's cos and sin forms and
  // then plug it into the above with the corresponding lat and lng of the
  // currently iterated spot and then if the distance is less than a certain 
  // amount then i add it to the results array and then return the results. 
  // word that should be it on this bit i think cool cool cool lets build out
  // the front end for now and the once i've got the right data coming in i can
  // build out this part and should have the whole thing working.

  console.log("location",location)
  console.log("location.city",location.city)


  try {
    // change this to keying into the location object once i get that working
    const spots = await Spot.findAll({
      where: {
        city: location,
        or:{
          country: location,
          or:{
            state: location

        }
        
      }},
    });
    if (spots.length === 0) {
      return res.json({ message: "No available spots found" });}
    // console.log("spots",spots) 
      let results = []
      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const bookings = await Booking.findAll({
          where: {
            spotId: spot.id,
            startDate: {
              [sequelize.Op.between]: [startDateCheck, endDateCheck],
            },
          },
        });
        if (bookings.length === 0) {
          results.push(spot)
        }
      }
      return res.json({ results });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ok so i can searcg by city and get all the spots in that city 
// i can also search by city and dates and get all the spots in that city that
// are available for those dates. well actually it requres a start and end date
// currently so how about adding a default end date of 3 days after the start
// date and default start date of today. and then just dispaly all the spots in
// that city that are available for those dates. if no spots are available then
// display a message saying no spots are available? or maybe just display all
// the spots in that city and then if the user wants to filter by dates they can
// do that. so i need to add a default start and end date to the query params
// and then if the user doesnt enter a start and end date then i can just use
// those default dates.





module.exports = router