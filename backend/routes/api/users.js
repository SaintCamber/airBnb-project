const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {validateSignup} = require('../../utils/checks')
const router = express.Router();
// backend/routes/api/users.js
// ...

// Sign up
router.post(
    '/',validateSignup,
    async (req, res) => {
      const {firstName,lastName, email, password, username } = req.body;
      const user = await User.signup({ firstName,lastName,email, username, password });
      
  
      await setTokenCookie(res, user);
  
      return res.json(
        user
      );
    }
  );

  router.delete('/:userId',requireAuth,async(req,res,next)=>{
    const { userId } = req.params
    const record = await User.findByPk(userId)
    if(!record){
        res.json({
            "message": "User couldn't be found",
            "statusCode": 404
          })
    
        }
       await User.destroy({where:{id:record.id}})
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })

})
module.exports = router;