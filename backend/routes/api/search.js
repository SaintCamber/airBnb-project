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
  const startDateCheck = new Date(startDate);
  const endDateCheck = new Date(endDate);


  try {
    const spots = await Spot.findAll({
      where: {
        city: location
        
      },
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


module.exports = router