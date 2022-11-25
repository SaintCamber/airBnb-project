
const express = require('express');
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const {reviewImage} = require("../../db/models")
const router = express.Router()

router.delete('/:reviewImageId',requireAuth,async (req,res,next)=>{
  let image = await reviewImage.findByPk(req.params.reviewImageId)
  if(!image){
      res.statusCode = 404
      res.json({
          "message": "Review Image couldn't be found",
          "statusCode": 404
        })
  }

  await reviewImage.destroy({where:{id:req.params.reviewImageId}})
  res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router;