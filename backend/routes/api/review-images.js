
const express = require('express');
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const {reviewImage} = require("../../db/models")
const router = express.Router()

router.delete('/:reviewId',requireAuth,async (req,res,next)=>{
    let review = reviewImage.findByPk(req.params.reviewId)
    if(!review){
        res.statusCode = 404
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
          })
    }

    await reviewImage.destroy({where:{id:req.params.reviewId}})
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;