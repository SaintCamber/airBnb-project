const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {validateLogin} = require('../../utils/checks')
const router = express.Router();
router.use(express.json())


// Log in
router.post(
    '/',validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
      // console.log(user)
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }
      
      await setTokenCookie(res, user);
      payload = {user:user.toSafeObject()}
      payload.token = req.cookies['token']
      return res.json(payload);
    },handleValidationErrors
  );

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  // get current user 
  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
         {user: user.toSafeObject()}
        );
      } else return res.json({ user: null });
    }
  );
  

module.exports = router;