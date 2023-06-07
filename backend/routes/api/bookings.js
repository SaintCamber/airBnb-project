const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, spotImage,Review,reviewImage,Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {validateDates} = require("../../utils/checks")
const moment = require("moment")
const router = express.Router();

router.get('/current',requireAuth,async(req,res,next)=>{
   const Bookings = [] 
   const currentUser = await User.findByPk(req.user.id)
   const bookings = await currentUser.getBookings()
   for(let booking of bookings){
      let spot = await booking.getSpot({attributes:{exclude:["description","createdAt","updatedAt"]}})
      let SpotImage =await spot.getSpotImages({where:{preview:true},limit:1,attributes:{exclude:["id","createdAt","updatedAt","spotId","preview"]}})
      spot = spot.toJSON()
      if(SpotImage[0]!==undefined){
         spot.previewImage = SpotImage[0].dataValues.url

         
       }
       booking = booking.toJSON()
       booking.spot = spot
       Bookings.push(booking)
   }
   res.json({Bookings})
})

router.put("/:bookingId",requireAuth,validateDates,async(req,res,next)=>{
   let booking1 = await Booking.findByPk(req.params.bookingId)
   if(!booking1){
      res.statusCode = 404
      return res.json( {
      "message": "Booking couldn't be found",
      "statusCode": 404
    })}
    let d1 = new Date(req.body.startDate)
    let d2 = new Date(req.body.endDate)
    let d3 = new Date()
    if(d3>d2){res.statusCode = 404
      res.json({
         "message": "Past bookings can't be modified",
         "statusCode": 403
       })}
   if(req.user.id!==booking1.userId){
      res.statusCode = 403
      return res.json({message:"forbidden",statusCode: 403})

   }
   let available = true;
    let bookings = await Booking.findAll({ where: { spotId: booking1.spotId } });
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      let reqStart = new Date(req.body.startDate);
      let reqEnd = new Date(req.body.endDate);
      let errors = {};


      if (reqStart >= bookingStart && reqStart <= bookingEnd) {
        available = false;
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (reqEnd >= bookingStart && reqEnd <= bookingEnd) {
        available = false;
        errors.endDate = "end date conflicts with an existing booking";
      }
      if (available === false) {
         res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: errors,
        });
      }
    }
if(available===true){

  booking1.update({startDate: new Date(req.body.startDate),
   endDate: new Date(req.body.endDate)})
   return res.json(booking1)
}
}
)




router.delete('/:bookingId',requireAuth, async (req, res, next) => {
   const { bookingId } = req.params
   const record = await Booking.findByPk(bookingId)
   if(!record){
      res.statusCode = 404
      return res.json({
         "message": "Booking couldn't be found",
         "statusCode": 404
      })
      
   }
   let spot= await record.getSpot()
   
   if(record.userId === req.user.id||req.user.id === spot.ownerId){
      let d1 = new Date(record.startDate)
      let d2 = new Date(record.endDate)
      let today = new Date()
      if(today>d1){
         res.statusCode = 403
         return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })


   }

   
   if(record){
      await Booking.destroy({where:{id:record.id}})
      
      
      return res.json({
         "message": "Successfully deleted",
         "statusCode": 200
      })
   }
}
else{
   res.statusCode = 403
   res.json({message:"forbidden",
statusCode:403})
}
   
})


router.get("/search", async (req, res) => {
   const { startDate, endDate, location } = req.query;

   try {
      const formattedStartDate = moment(startDate, "MM/DD/YYYY").format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate, "MM/DD/YYYY").format("YYYY-MM-DD");

      const spots = await Spot.findAll({
         where: {
            city: location
         },
         include: [
            {
               model: Booking,
               where: {
                  [sequelize.Op.or]: [
                     {
                        startDate: {
                           [sequelize.Op.gt]: formattedEndDate
                        }
                     },
                     {
                        endDate: {
                           [sequelize.Op.lt]: formattedStartDate
                        }
                     }
                  ]
               },
               required: false // Include spots even if there are no matching bookings
            }
         ],
         having: sequelize.literal('COUNT(Bookings.id) = 0') // Filter spots that don't have any bookings
      });

      res.json({ spots });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
});


module.exports = router