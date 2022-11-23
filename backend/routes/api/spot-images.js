const express = require("express");
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, spotImage,Review,reviewImage,Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.delete('/:imageId',requireAuth,async (req,res,next)=>{
    let image = spotImage.findByPk(req.params.imageId)
    if(!image){
        res.statusCode = 404
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }

    await spotImage.destroy({where:{id:req.params.imageId}})
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})
module.exports = router;