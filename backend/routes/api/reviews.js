const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, spotImage,Review,reviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {isReviewOwnedByCurrentUser} = require('../../utils/checks.js')
const router = express.Router();


router.get('/current',requireAuth,async(req,res)=>{
    const reviews = await Review.findAll({where:{userId:req.user.id}})
    for (let i = 0 ; i <reviews.length;i++){
        let review = reviews[i]
        let spot = await review.getSpot()
        let user = req.user.dataValues
        let ReviewImages = review.getreviewImages()
        console.log(spot)
        console.log(user)
    }
    res.json()
})

router.post('/:reviewId/images',requireAuth,isReviewOwnedByCurrentUser,async(req,res,next)=>{
    let review = await Review.findByPk(req.params.reviewId)
    let {url}=req.body
    if(!review){
        res.json({"message": "Review couldn't be found",
        "statusCode": 404})
    }
    let images = await review.getImages()
    console.log(images)
    
    if(images.length>=10){
        res.json( {
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
          
        }
        const newImage = await reviewImage.create({url,reviewId:req.params.reviewId})
        res.json({url:newImage.url})
})

router.put('/:reviewId',requireAuth,isReviewOwnedByCurrentUser,async(req,res,next)=>{
    let reviewToEdit = Review.findByPk(req.params.reviewId)
    let {review,stars} = req.body
    reviewToEdit.update({review,stars})
    reviewToEdit.save()
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
       await Review.destroy({where:{id:record.id}})
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })

})

module.exports = router;