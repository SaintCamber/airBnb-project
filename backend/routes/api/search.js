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
const router = express.Router();

router.get("/", async (req, res) => {
  // return res.json({ message: "hello" });
  const { startDate, endDate, location } = req.query;
  console.log("startDate",startDate)
  console.log("endDate",endDate)
  console.log("location",location)


  try {
    const spots = await Spot.findAll({
      where: {
        city: location
        
      },
    });
    res.json(spots[0].bookings );

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router