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
function isObject1(o) {
  return !!o && o.constructor === Object
}

//test route to get all spots

router.get("/", validateQueryParameters,async (req, res, next) => {
 
  
  const payLoad = [];
  let pagination = {};
  let allSpots;
  
    let { page, size } = req.query;
    page ? page = page:0
    size ? size = size:0

    
    if (parseInt(page) >= 1 && parseInt(size) >= 1) {
      pagination.limit = size;
      pagination.offset = size * (page - 1);
    }
  
  allSpots = await Spot.findAll({ ...pagination,...req.queryObj});
  if (allSpots) {
    for (let i = 0; i < allSpots.length; i++) {
      let spot = allSpots[i];
      let reviews = await spot.getReviews({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
      })
     
        let SpotImage =await spot.getSpotImages({where:{preview:true},limit:1,attributes:{exclude:["id","createdAt","updatedAt","spotId","preview"]}})
        //   console.log(reviews[0].toJSON().avgRating)
        spot = spot.toJSON();
        spot.avgRating = reviews[0].toJSON().avgRating||"no Reviews"
        if(SpotImage[0]!==undefined){
          spot.previewImage = SpotImage[0].dataValues.url||"No Preview Image"

          
        }
      
      payLoad.push(spot);
    }
  }
  if (Object.entries(pagination).length) {
    res.json({ Spots: payLoad, page, size });
  } else {
    res.json({ Spots: payLoad });
  }
});
//get current user's spots

router.get("/current", requireAuth, async (req, res, next) => {
  allSpots = await Spot.findAll({where:{ownerId:req.user.id}});
  let payload = []
  if (allSpots) {
    for (let i = 0; i < allSpots.length; i++) {
      let spot = allSpots[i];
      let reviews = await spot.getReviews({
        attributes: [
          [sequelize.fn("ROUND",sequelize.fn("AVG", sequelize.col("stars"))), "avgRating"],
        ],
      })
     
        let SpotImage =await spot.getSpotImages({where:{preview:true},limit:1,attributes:{exclude:["id","createdAt","updatedAt","spotId","preview"]}})
        //   console.log(reviews[0].toJSON().avgRating)
        spot = spot.toJSON();
        if(SpotImage.length){
          spot.avgRating = reviews[0].toJSON().avgRating||"no Reviews"
            spot.previewImage = SpotImage[0].dataValues.url||"No Preview Image"

        }
        if(!SpotImage.length){
          spot.previewImage = "no preview image"
        }

          
        
      
      payload.push(spot);
    }
  }

  res.json({Spots:payload});
});

router.post("/", requireAuth, validateNewSpot, async (req, res, next) => {
  let payload = req.body;
  payload.ownerId = req.user.id;
  newSpot = await Spot.create(payload);
  res.json(newSpot);
});

router.post(
  "/:spotId/images",
  requireAuth,
  isSpotOwnedByCurrentUser,
  async (req, res, next) => {
   newSpotImage = await SpotImage.create({spotId:req.params.spotId,url:req.body.url,preview:req.body.preview})
    verifyNewSpotImage = await SpotImage.findByPk(newSpotImage.id)
    if(verifyNewSpotImage){
        res.json({id:verifyNewSpotImage.id,url:verifyNewSpotImage.url,preview:verifyNewSpotImage.preview})
    }
}

);
router.put("/:spotId",requireAuth,isSpotOwnedByCurrentUser,validateNewSpot,async(req,res,next)=>{
    let spotToUpdate = await Spot.findByPk(req.params.spotId)
    if(!spotToUpdate){
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);

    for (let i = 0 ; i<keys.length;i++){
        let key = keys[i]
        let value = values[i]
        spotToUpdate[key]=value
    }
    spotToUpdate.save()
    
    res.json(spotToUpdate)
})
router.get('/:spotId',async (req,res,next)=>{
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
      res.statusCode = 404
      return res.json({message:"Spot couldn't be found",statusCode:404})
    }
    let owner = await spot.getOwner({attributes:{exclude:['username']}})
    let SpotImages = await spot.getSpotImages({attributes:{exclude:["createdAt","updatedAt","spotId"]}})
    let reviews = await spot.getReviews()
    let avgRating = await spot.getReviews({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ]});
        spot=spot.toJSON()
    spot.numReviews = reviews.length
    spot.avgStarRating = avgRating[0].dataValues.avgRating||0     
    let payload = {...spot,SpotImages,owner}
    res.json(payload)
})


router.delete('/:spotId',requireAuth,isSpotOwnedByCurrentUser, async (req, res, next) => {
    const { spotId } = req.params
    const record = await Spot.findByPk(spotId)
    if(!record){
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
          return
    }
    if(record){
        await Spot.destroy({where:{id:record.id}})
       
        
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
          return
      }
      
    })



router.post("/:spotId/reviews",requireAuth,validateReview,async (req,res,next)=>{
   const {review ,stars} = req.body
    const newReview = await Review.create({userId:req.user.id,spotId:req.params.spotId,review,stars})
    const verify = await Review.findByPk(newReview.id)
    if(verify){
        res.json(verify.dataValues)
    }
})

router.get('/:spotId/reviews',doesSpotExist,async(req,res,next)=>{
  let reviews = await Review.findAll({where:{spotId:req.params.spotId},include:[{model:User,attributes:{exclude:["username","hashedPassword","createdAt","updatedAt","email"]}},{model:reviewImage,as:"ReviewImages",attributes:{exclude:["createdAt","updatedAt","reviewId"]}}]})
  res.json({Reviews : reviews})
})

router.post(
  "/:spotIdForBooking/bookings",
  requireAuth,validateDates,
  async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotIdForBooking);
    if (!spot) {
      res.statusCode = 404
      return res.json({ message: "spot not found", statusCode: 404 });
    }
    if(spot.ownerId===req.user.id){
      res.statusCode = 403
      return res.json({message:"forbidden",statusCode:403})
    }
    // if (spot.ownerId === req.user.id) {
    //   res.json({ message: "you can't book your own spot" });
    // }
    let available = true;
    let bookings = await Booking.findAll({ where: { spotId: spot.id } });
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

  let newBooking = await Booking.create({
    spotId: req.params.spotIdForBooking,
    userId: req.user.id,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
  });
  
  
  res.json(newBooking);
}
}
);

router.get('/:spotId/bookings',requireAuth,async(req,res,next)=>{
  
  let spot = await Spot.findByPk(req.params.spotId)
  if(!spot){res.statusCode = 404
     return res.json({"message":"spot not found",statusCode:404})}
  let owner = await spot.getOwner()
  let check = owner.id === req.user.id
  if(!check){
    let bookings = await Booking.findAll({where:{spotId:req.params.spotId},attributes:{exclude:['id',"userId","createdAt","updatedAt"]}})
    return res.json({Bookings:bookings})

  } 
  if(check){
    let bookings = await Booking.findAll({where:{spotId:spot.id},include:{model:User,attributes:{exclude:["username","createdAt","updatedAt","email","hashedPassword"]}}})
    return res.json({Bookings:bookings})
  } 
    
  
})
module.exports = router;
