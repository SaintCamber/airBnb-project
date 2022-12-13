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
        {user}
      );
    }
  );

module.exports = router;