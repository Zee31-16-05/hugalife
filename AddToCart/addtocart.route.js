var express = require('express');
const router = express.Router();
const User = require('../Users/users.model')
const addtocartController = require('./addtocart.controller')
var jwt = require('jsonwebtoken');
const secretKey = 'zeeshan123'


router.post('/',function(req, res){
    return addtocartController.createAddtocart(req, res)
})

function validateToken(req, res, next){

    const token = req.headers["authorization"].split(" ")[1];
     console.log("validate token",token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
      }
      jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    
        try {
          // Fetch user details from the database using the decoded userId
          const user = await User.findById(decoded.userId);
         console.log("Fetching user details",user);
          if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
          }
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }); jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    try {
      // Fetch user details from the database using the decoded userId
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized - User not found' });
      }

      // Attach user information to the request object for use in subsequent middleware or routes
      req.user = user;

      // Token is valid - continue with the next middleware or route
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

}

router.get('/:id',validateToken,function(req, res){
    return addtocartController.getCartByUserId(req, res)
})

module.exports = router
