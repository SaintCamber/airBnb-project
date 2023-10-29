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
    page ? page = page : 0
    size ? size = size : 0

    
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
    res.json( payLoad );
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
  const countries = [
    {
        "country": "Afghanistan",
        "continent": "Asia"
    },
    {
        "country": "Albania",
        "continent": "Europe"
    },
    {
        "country": "Algeria",
        "continent": "Africa"
    },
    {
        "country": "American Samoa",
        "continent": "Oceania"
    },
    {
        "country": "Andorra",
        "continent": "Europe"
    },
    {
        "country": "Angola",
        "continent": "Africa"
    },
    {
        "country": "Anguilla",
        "continent": "North America"
    },
    {
        "country": "Antarctica",
        "continent": "Antarctica"
    },
    {
        "country": "Antigua and Barbuda",
        "continent": "North America"
    },
    {
        "country": "Argentina",
        "continent": "South America"
    },
    {
        "country": "Armenia",
        "continent": "Asia"
    },
    {
        "country": "Aruba",
        "continent": "North America"
    },
    {
        "country": "Australia",
        "continent": "Oceania"
    },
    {
        "country": "Austria",
        "continent": "Europe"
    },
    {
        "country": "Azerbaijan",
        "continent": "Asia"
    },
    {
        "country": "Bahamas",
        "continent": "North America"
    },
    {
        "country": "Bahrain",
        "continent": "Asia"
    },
    {
        "country": "Bangladesh",
        "continent": "Asia"
    },
    {
        "country": "Barbados",
        "continent": "North America"
    },
    {
        "country": "Belarus",
        "continent": "Europe"
    },
    {
        "country": "Belgium",
        "continent": "Europe"
    },
    {
        "country": "Belize",
        "continent": "North America"
    },
    {
        "country": "Benin",
        "continent": "Africa"
    },
    {
        "country": "Bermuda",
        "continent": "North America"
    },
    {
        "country": "Bhutan",
        "continent": "Asia"
    },
    {
        "country": "Bolivia",
        "continent": "South America"
    },
    {
        "country": "Bosnia and Herzegovina",
        "continent": "Europe"
    },
    {
        "country": "Botswana",
        "continent": "Africa"
    },
    {
        "country": "Bouvet Island",
        "continent": "Antarctica"
    },
    {
        "country": "Brazil",
        "continent": "South America"
    },
    {
        "country": "British Indian Ocean Territory",
        "continent": "Africa"
    },
    {
        "country": "Brunei",
        "continent": "Asia"
    },
    {
        "country": "Bulgaria",
        "continent": "Europe"
    },
    {
        "country": "Burkina Faso",
        "continent": "Africa"
    },
    {
        "country": "Burundi",
        "continent": "Africa"
    },
    {
        "country": "Cambodia",
        "continent": "Asia"
    },
    {
        "country": "Cameroon",
        "continent": "Africa"
    },
    {
        "country": "Canada",
        "continent": "North America"
    },
    {
        "country": "Cape Verde",
        "continent": "Africa"
    },
    {
        "country": "Cayman Islands",
        "continent": "North America"
    },
    {
        "country": "Central African Republic",
        "continent": "Africa"
    },
    {
        "country": "Chad",
        "continent": "Africa"
    },
    {
        "country": "Chile",
        "continent": "South America"
    },
    {
        "country": "China",
        "continent": "Asia"
    },
    {
        "country": "Christmas Island",
        "continent": "Oceania"
    },
    {
        "country": "Cocos (Keeling) Islands",
        "continent": "Oceania"
    },
    {
        "country": "Colombia",
        "continent": "South America"
    },
    {
        "country": "Comoros",
        "continent": "Africa"
    },
    {
        "country": "Congo",
        "continent": "Africa"
    },
    {
        "country": "Cook Islands",
        "continent": "Oceania"
    },
    {
        "country": "Costa Rica",
        "continent": "North America"
    },
    {
        "country": "Croatia",
        "continent": "Europe"
    },
    {
        "country": "Cuba",
        "continent": "North America"
    },
    {
        "country": "Cyprus",
        "continent": "Asia"
    },
    {
        "country": "Czech Republic",
        "continent": "Europe"
    },
    {
        "country": "Denmark",
        "continent": "Europe"
    },
    {
        "country": "Djibouti",
        "continent": "Africa"
    },
    {
        "country": "Dominica",
        "continent": "North America"
    },
    {
        "country": "Dominican Republic",
        "continent": "North America"
    },
    {
        "country": "East Timor",
        "continent": "Asia"
    },
    {
        "country": "Ecuador",
        "continent": "South America"
    },
    {
        "country": "Egypt",
        "continent": "Africa"
    },
    {
        "country": "El Salvador",
        "continent": "North America"
    },
    {
        "country": "England",
        "continent": "Europe"
    },
    {
        "country": "Equatorial Guinea",
        "continent": "Africa"
    },
    {
        "country": "Eritrea",
        "continent": "Africa"
    },
    {
        "country": "Estonia",
        "continent": "Europe"
    },
    {
        "country": "Ethiopia",
        "continent": "Africa"
    },
    {
        "country": "Falkland Islands",
        "continent": "South America"
    },
    {
        "country": "Faroe Islands",
        "continent": "Europe"
    },
    {
        "country": "Fiji Islands",
        "continent": "Oceania"
    },
    {
        "country": "Finland",
        "continent": "Europe"
    },
    {
        "country": "France",
        "continent": "Europe"
    },
    {
        "country": "French Guiana",
        "continent": "South America"
    },
    {
        "country": "French Polynesia",
        "continent": "Oceania"
    },
    {
        "country": "French Southern territories",
        "continent": "Antarctica"
    },
    {
        "country": "Gabon",
        "continent": "Africa"
    },
    {
        "country": "Gambia",
        "continent": "Africa"
    },
    {
        "country": "Georgia",
        "continent": "Asia"
    },
    {
        "country": "Germany",
        "continent": "Europe"
    },
    {
        "country": "Ghana",
        "continent": "Africa"
    },
    {
        "country": "Gibraltar",
        "continent": "Europe"
    },
    {
        "country": "Greece",
        "continent": "Europe"
    },
    {
        "country": "Greenland",
        "continent": "North America"
    },
    {
        "country": "Grenada",
        "continent": "North America"
    },
    {
        "country": "Guadeloupe",
        "continent": "North America"
    },
    {
        "country": "Guam",
        "continent": "Oceania"
    },
    {
        "country": "Guatemala",
        "continent": "North America"
    },
    {
        "country": "Guinea",
        "continent": "Africa"
    },
    {
        "country": "Guinea-Bissau",
        "continent": "Africa"
    },
    {
        "country": "Guyana",
        "continent": "South America"
    },
    {
        "country": "Haiti",
        "continent": "North America"
    },
    {
        "country": "Heard Island and McDonald Islands",
        "continent": "Antarctica"
    },
    {
        "country": "Holy See (Vatican City State)",
        "continent": "Europe"
    },
    {
        "country": "Honduras",
        "continent": "North America"
    },
    {
        "country": "Hong Kong",
        "continent": "Asia"
    },
    {
        "country": "Hungary",
        "continent": "Europe"
    },
    {
        "country": "Iceland",
        "continent": "Europe"
    },
    {
        "country": "India",
        "continent": "Asia"
    },
    {
        "country": "Indonesia",
        "continent": "Asia"
    },
    {
        "country": "Iran",
        "continent": "Asia"
    },
    {
        "country": "Iraq",
        "continent": "Asia"
    },
    {
        "country": "Ireland",
        "continent": "Europe"
    },
    {
        "country": "Israel",
        "continent": "Asia"
    },
    {
        "country": "Italy",
        "continent": "Europe"
    },
    {
        "country": "Ivory Coast",
        "continent": "Africa"
    },
    {
        "country": "Jamaica",
        "continent": "North America"
    },
    {
        "country": "Japan",
        "continent": "Asia"
    },
    {
        "country": "Jordan",
        "continent": "Asia"
    },
    {
        "country": "Kazakhstan",
        "continent": "Asia"
    },
    {
        "country": "Kenya",
        "continent": "Africa"
    },
    {
        "country": "Kiribati",
        "continent": "Oceania"
    },
    {
        "country": "Kuwait",
        "continent": "Asia"
    },
    {
        "country": "Kyrgyzstan",
        "continent": "Asia"
    },
    {
        "country": "Laos",
        "continent": "Asia"
    },
    {
        "country": "Latvia",
        "continent": "Europe"
    },
    {
        "country": "Lebanon",
        "continent": "Asia"
    },
    {
        "country": "Lesotho",
        "continent": "Africa"
    },
    {
        "country": "Liberia",
        "continent": "Africa"
    },
    {
        "country": "Libyan Arab Jamahiriya",
        "continent": "Africa"
    },
    {
        "country": "Liechtenstein",
        "continent": "Europe"
    },
    {
        "country": "Lithuania",
        "continent": "Europe"
    },
    {
        "country": "Luxembourg",
        "continent": "Europe"
    },
    {
        "country": "Macao",
        "continent": "Asia"
    },
    {
        "country": "North Macedonia",
        "continent": "Europe"
    },
    {
        "country": "Madagascar",
        "continent": "Africa"
    },
    {
        "country": "Malawi",
        "continent": "Africa"
    },
    {
        "country": "Malaysia",
        "continent": "Asia"
    },
    {
        "country": "Maldives",
        "continent": "Asia"
    },
    {
        "country": "Mali",
        "continent": "Africa"
    },
    {
        "country": "Malta",
        "continent": "Europe"
    },
    {
        "country": "Marshall Islands",
        "continent": "Oceania"
    },
    {
        "country": "Martinique",
        "continent": "North America"
    },
    {
        "country": "Mauritania",
        "continent": "Africa"
    },
    {
        "country": "Mauritius",
        "continent": "Africa"
    },
    {
        "country": "Mayotte",
        "continent": "Africa"
    },
    {
        "country": "Mexico",
        "continent": "North America"
    },
    {
        "country": "Micronesia, Federated States of",
        "continent": "Oceania"
    },
    {
        "country": "Moldova",
        "continent": "Europe"
    },
    {
        "country": "Monaco",
        "continent": "Europe"
    },
    {
        "country": "Mongolia",
        "continent": "Asia"
    },
    {
        "country": "Montenegro",
        "continent": "Europe"
    },
    {
        "country": "Montserrat",
        "continent": "North America"
    },
    {
        "country": "Morocco",
        "continent": "Africa"
    },
    {
        "country": "Mozambique",
        "continent": "Africa"
    },
    {
        "country": "Myanmar",
        "continent": "Asia"
    },
    {
        "country": "Namibia",
        "continent": "Africa"
    },
    {
        "country": "Nauru",
        "continent": "Oceania"
    },
    {
        "country": "Nepal",
        "continent": "Asia"
    },
    {
        "country": "Netherlands",
        "continent": "Europe"
    },
    {
        "country": "Netherlands Antilles",
        "continent": "North America"
    },
    {
        "country": "New Caledonia",
        "continent": "Oceania"
    },
    {
        "country": "New Zealand",
        "continent": "Oceania"
    },
    {
        "country": "Nicaragua",
        "continent": "North America"
    },
    {
        "country": "Niger",
        "continent": "Africa"
    },
    {
        "country": "Nigeria",
        "continent": "Africa"
    },
    {
        "country": "Niue",
        "continent": "Oceania"
    },
    {
        "country": "Norfolk Island",
        "continent": "Oceania"
    },
    {
        "country": "North Korea",
        "continent": "Asia"
    },
    {
        "country": "Northern Ireland",
        "continent": "Europe"
    },
    {
        "country": "Northern Mariana Islands",
        "continent": "Oceania"
    },
    {
        "country": "Norway",
        "continent": "Europe"
    },
    {
        "country": "Oman",
        "continent": "Asia"
    },
    {
        "country": "Pakistan",
        "continent": "Asia"
    },
    {
        "country": "Palau",
        "continent": "Oceania"
    },
    {
        "country": "Palestine",
        "continent": "Asia"
    },
    {
        "country": "Panama",
        "continent": "North America"
    },
    {
        "country": "Papua New Guinea",
        "continent": "Oceania"
    },
    {
        "country": "Paraguay",
        "continent": "South America"
    },
    {
        "country": "Peru",
        "continent": "South America"
    },
    {
        "country": "Philippines",
        "continent": "Asia"
    },
    {
        "country": "Pitcairn",
        "continent": "Oceania"
    },
    {
        "country": "Poland",
        "continent": "Europe"
    },
    {
        "country": "Portugal",
        "continent": "Europe"
    },
    {
        "country": "Puerto Rico",
        "continent": "North America"
    },
    {
        "country": "Qatar",
        "continent": "Asia"
    },
    {
        "country": "Reunion",
        "continent": "Africa"
    },
    {
        "country": "Romania",
        "continent": "Europe"
    },
    {
        "country": "Russian Federation",
        "continent": "Europe"
    },
    {
        "country": "Rwanda",
        "continent": "Africa"
    },
    {
        "country": "Saint Helena",
        "continent": "Africa"
    },
    {
        "country": "Saint Kitts and Nevis",
        "continent": "North America"
    },
    {
        "country": "Saint Lucia",
        "continent": "North America"
    },
    {
        "country": "Saint Pierre and Miquelon",
        "continent": "North America"
    },
    {
        "country": "Saint Vincent and the Grenadines",
        "continent": "North America"
    },
    {
        "country": "Samoa",
        "continent": "Oceania"
    },
    {
        "country": "San Marino",
        "continent": "Europe"
    },
    {
        "country": "Sao Tome and Principe",
        "continent": "Africa"
    },
    {
        "country": "Saudi Arabia",
        "continent": "Asia"
    },
    {
        "country": "Scotland",
        "continent": "Europe"
    },
    {
        "country": "Senegal",
        "continent": "Africa"
    },
    {
        "country": "Serbia",
        "continent": "Europe"
    },
    {
        "country": "Seychelles",
        "continent": "Africa"
    },
    {
        "country": "Sierra Leone",
        "continent": "Africa"
    },
    {
        "country": "Singapore",
        "continent": "Asia"
    },
    {
        "country": "Slovakia",
        "continent": "Europe"
    },
    {
        "country": "Slovenia",
        "continent": "Europe"
    },
    {
        "country": "Solomon Islands",
        "continent": "Oceania"
    },
    {
        "country": "Somalia",
        "continent": "Africa"
    },
    {
        "country": "South Africa",
        "continent": "Africa"
    },
    {
        "country": "South Georgia and the South Sandwich Islands",
        "continent": "Antarctica"
    },
    {
        "country": "South Korea",
        "continent": "Asia"
    },
    {
        "country": "South Sudan",
        "continent": "Africa"
    },
    {
        "country": "Spain",
        "continent": "Europe"
    },
    {
        "country": "Sri Lanka",
        "continent": "Asia"
    },
    {
        "country": "Sudan",
        "continent": "Africa"
    },
    {
        "country": "Suriname",
        "continent": "South America"
    },
    {
        "country": "Svalbard and Jan Mayen",
        "continent": "Europe"
    },
    {
        "country": "Swaziland",
        "continent": "Africa"
    },
    {
        "country": "Sweden",
        "continent": "Europe"
    },
    {
        "country": "Switzerland",
        "continent": "Europe"
    },
    {
        "country": "Syria",
        "continent": "Asia"
    },
    {
        "country": "Tajikistan",
        "continent": "Asia"
    },
    {
        "country": "Tanzania",
        "continent": "Africa"
    },
    {
        "country": "Thailand",
        "continent": "Asia"
    },
    {
        "country": "The Democratic Republic of Congo",
        "continent": "Africa"
    },
    {
        "country": "Togo",
        "continent": "Africa"
    },
    {
        "country": "Tokelau",
        "continent": "Oceania"
    },
    {
        "country": "Tonga",
        "continent": "Oceania"
    },
    {
        "country": "Trinidad and Tobago",
        "continent": "North America"
    },
    {
        "country": "Tunisia",
        "continent": "Africa"
    },
    {
        "country": "Turkey",
        "continent": "Asia"
    },
    {
        "country": "Turkmenistan",
        "continent": "Asia"
    },
    {
        "country": "Turks and Caicos Islands",
        "continent": "North America"
    },
    {
        "country": "Tuvalu",
        "continent": "Oceania"
    },
    {
        "country": "Uganda",
        "continent": "Africa"
    },
    {
        "country": "Ukraine",
        "continent": "Europe"
    },
    {
        "country": "United Arab Emirates",
        "continent": "Asia"
    },
    {
        "country": "United Kingdom",
        "continent": "Europe"
    },
    {
        "country": "United States",
        "continent": "North America"
    },
    {
        "country": "United States Minor Outlying Islands",
        "continent": "Oceania"
    },
    {
        "country": "Uruguay",
        "continent": "South America"
    },
    {
        "country": "Uzbekistan",
        "continent": "Asia"
    },
    {
        "country": "Vanuatu",
        "continent": "Oceania"
    },
    {
        "country": "Venezuela",
        "continent": "South America"
    },
    {
        "country": "Vietnam",
        "continent": "Asia"
    },
    {
        "country": "Virgin Islands, British",
        "continent": "North America"
    },
    {
        "country": "Virgin Islands, U.S.",
        "continent": "North America"
    },
    {
        "country": "Wales",
        "continent": "Europe"
    },
    {
        "country": "Wallis and Futuna",
        "continent": "Oceania"
    },
    {
        "country": "Western Sahara",
        "continent": "Africa"
    },
    {
        "country": "Yemen",
        "continent": "Asia"
    },
    {
        "country": "Zambia",
        "continent": "Africa"
    },
    {
        "country": "Zimbabwe",
        "continent": "Africa"
    }
]
  let payload = req.body;
  let {continent} = countries.find((country) => country.country.toLowerCase() === payload.country.toLowerCase());
  
  payload.continent = continent
  

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
    spotToUpdate = spotToUpdate.toJSON()
    delete spotToUpdate["createdAt"]
    delete spotToUpdate["updatedAt"]
    delete spotToUpdate["ownerId"]
    delete spotToUpdate["id"]



    
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
    let bookings = await Booking.findAll({where:{spotId:req.params.spotId},attributes:{exclude:["userId","createdAt","updatedAt"]}})
    return res.json({Bookings:bookings})

  } 
  if(check){
    let bookings = await Booking.findAll({where:{spotId:spot.id},include:{model:User,attributes:{exclude:["username","createdAt","updatedAt","email","hashedPassword"]}}})
    return res.json({Bookings:bookings})
  } 
    
  
})
module.exports = router;
