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
  const { startDate, endDate,State } = req.query;

  const startDateCheck =startDate ? new Date(startDate) : new Date();
  const endDateCheck = endDate ? new Date(endDate) : new Date(startDateCheck.getDate() + 3);



  try {
    const spots = await Spot.findAll({
      where: {
        state: State,

        }
        
      ,
    });
    if (spots.length === 0) {
      return res.json({ message: "No available spots found" });}
    // 
      let results = {}
      for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        let reviews = await spot.getReviews({
          attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
          ],
        })
       
          let SpotImage =await spot.getSpotImages({where:{preview:true},limit:1,attributes:{exclude:["id","createdAt","updatedAt","spotId","preview"]}})
          spot = spot.toJSON();
          spot.avgRating = reviews[0].toJSON().avgRating||"no Reviews"
          if(SpotImage[0]!==undefined){
            spot.previewImage = SpotImage[0].dataValues.url||"No Preview Image"
  
            
          }
        const bookings = await Booking.findAll({
          where: {
            spotId: spot.id,
            startDate: {
              [sequelize.Op.between]: [startDateCheck, endDateCheck],
            },
          },
        });
        if (bookings.length === 0) {
          results[spot.id] = spot
        }
      }
      return res.json(results);

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