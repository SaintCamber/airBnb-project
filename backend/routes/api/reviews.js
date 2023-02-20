const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, spotImage,Review,reviewImage,Booking ,SpotImage} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {isReviewOwnedByCurrentUser} = require('../../utils/checks.js');
const { parse } = require("path");
const router = express.Router();


router.get('/current',requireAuth,async(req,res)=>{
    // const Reviews = await Review.findAll({where:{userId:req.user.id},include:[{model:User,attributes:{exclude:["username","hashedPassword","createdAt","updatedAt","email"]}},{model:Spot,attributes:[sequelize.col("SpotImage.url"),"PreviewImage"],include:{model :SpotImage,as:"PreviewImage"}},{model:reviewImage,as:"ReviewImages",attributes:{exclude:["createdAt","updatedAt","reviewId"]}}]})
    const payload = []
    const Reviews = await Review.findAll({where:{userId:req.user.id}})
    for (let i = 0 ;i<Reviews.length;i++){
        let review = Reviews[i]
        let spot = await review.getSpot()
        // //console.log(spot)
        let SpotImages =await spot.getSpotImages({where:{preview:true},limit:1,attributes:{exclude:["id","createdAt","updatedAt","spotId","preview"]}})
        spot = spot.toJSON()
        let user = await review.getUser({attributes:{exclude:["username"]}})
        let ReviewImages =await review.getReviewImages()
        if(SpotImages.length){
            spot.previewImage = SpotImages[0].dataValues.url||"No Preview Image"

        }
        review = review.toJSON()
        review.User = user
        review.Spot = spot
        review.ReviewImages = ReviewImages
        let  payloadOBJ = {...review}
        payload.push(payloadOBJ)

    }
   
    res.json({Reviews:payload})
})

router.post('/:reviewId/images',requireAuth,isReviewOwnedByCurrentUser,async(req,res,next)=>{
   
    let review = await Review.findByPk(req.params.reviewId)
    if(!review){res.statusCode = 404
        return res.json({"message":"Review not found",statusCode:404})}
    let images = await review.getReviewImages()
    
    const {url} = req.body
    if(images.length>=10){
        res.json( {
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
          return
        }
        const newImage = await reviewImage.create({url,reviewId:req.params.reviewId})
        res.json({id:newImage.id,url:newImage.url})
})

router.put('/:reviewId',requireAuth,isReviewOwnedByCurrentUser,async(req,res,next)=>{
    let reviewToEdit = await Review.findByPk(req.params.reviewId)
    if(!reviewToEdit){res.statusCode = 404
    return res.json({message:"Spot couldn't be found",statusCode:404})}
    let {review,stars} = req.body
    reviewToEdit.review = review
    reviewToEdit.stars = stars
    await reviewToEdit.save()
    res.json(reviewToEdit)

})

router.delete('/:reviewId',requireAuth,isReviewOwnedByCurrentUser,async(req,res,next)=>{
    const { reviewId } = req.params
    const record = await Review.findByPk(reviewId)
    if(!record){
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    
        }
       Review.destroy({where:{id:record.id}})
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })

})

module.exports = router;