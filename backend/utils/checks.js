const { check,validationResult } = require('express-validator');
const {handleValidationErrors} = require('./validation')
const {Spot}=require('../db/models')
const validateSignup = [
    check('firstName')
    .exists({checkFalsy:true})
        .withMessage('first name required'),
        check('lastName')
    .exists({checkFalsy:true})
        .withMessage('last name required'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  const validateNewSpot = [
    check("address").exists({ checkFalsy: true }).isLength({min:3}).withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).isLength({min:3}).withMessage("City is required"),
    check("state").exists({ checkFalsy: true }).isLength({min:3}).withMessage("State is required"),
    check("country").exists({ checkFalsy: true }).isLength({min:3}).withMessage("Country is required"),
    check("lat").exists({ checkFalsy: true }).isNumeric({min:-180,max:180}).withMessage("Latitude is not valid"),
    check("lng").exists({ checkFalsy: true }).isNumeric({min:-180,max:180}).withMessage("Longitude is not valid"),
    check("name").exists({ checkFalsy: true }).isLength({min:3,max:50}).withMessage("Name must be less than 50 characters"),
    check("description").exists({ checkFalsy: true }).isLength({min:3,max:500}).withMessage("Description is required"),
    check("price").exists({ checkFalsy: true }).isNumeric().withMessage("Price per day is required"),
    handleValidationErrors
  ]
  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

 const isSpotOwnedByCurrentUser = async (req,res,next)=>{
    currentUserId = req.user.id;
    spotId = req.params.spotId;

    let spotToCheck = await Spot.findByPk(spotId)
    if(!spotToCheck){
      res.json({message: "Spot couldn't be found",
                statusCode:404})
    }
    if(parseInt(spotToCheck.ownerId)===parseInt(currentUserId)){
      next()
    }
    else{
      const err = new Error('Authorization required');
    err.title = 'Authorization required';
    err.errors = ['Authorization required'];
    err.status = 401;
    return next(err);
    }
 }



 const deleteARecord = (table,recordId)=>{}


  module.exports ={validateSignup,validateLogin,validateNewSpot,isSpotOwnedByCurrentUser}