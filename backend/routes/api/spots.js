const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, spotImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  validateNewSpot,
  isSpotOwnedByCurrentUser,
} = require("../../utils/checks");
const router = express.Router();

//test route to get all spots

router.get("/", async (req, res, next) => {
  const payLoad = [];
  let allSpots;
  let { page, size } = req.query;
  if (!page) page = 1;
  if (!size) size = 5;

  let pagination = {};
  if (parseInt(page) >= 1 && parseInt(size) >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }
  allSpots = await Spot.findAll({ ...pagination });
  if (allSpots) {
    for (let i = 0; i < allSpots.length; i++) {
      let spot = allSpots[i];
      let reviews = await spot.getReviews({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
      });
      //   console.log(reviews[0].toJSON().avgRating)
      spot = spot.toJSON();
      spot.avgRating = reviews[0].toJSON().avgRating;
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
  let spots = await req.user.getSpots();
  res.json(spots);
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
   newSpotImage = await spotImage.create({spotId:req.params.spotId,url:req.body.url,preview:req.body.preview})
    verifyNewSpotImage = await spotImage.findByPk(newSpot.id)
    if(verifyNewSpotImage){
        res.json({id:verifyNewSpot.id,url:verifyNewSpot.url,preview:verifyNewSpot.preview})
    }
}

);
router.put("/:spotId",requireAuth,isSpotOwnedByCurrentUser,validateNewSpot,async(req,res,next)=>{
    let spotToUpdate = await Spot.findByPk(req.params.spotId)

    let keys = Object.keys(req.body);
    let values = Object.values(req.body);

    for (let i = 0 ; i<keys.length;i++){
        let key = keys[i]
        let value = values[i]
        spotToUpdate[key]=value
    }
    spotToUpdate.save()
    verifySpot = await Spot.findByPk(spotToUpdate.id)
    res.json(verifySpot)

})




router.delete('/:spotId',requireAuth,isSpotOwnedByCurrentUser,async (req,res,next)=>{
    
     res.json({message: "sucessfully deleted",statusCode:200})

})



module.exports = router;
