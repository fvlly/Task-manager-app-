const jwt = require("jsonwebtoken")
const User = require("../models/users")

const protect = async (req,res, next) => {
    // checks if request has a request

    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token from header
            token = req.headers.authorization.split(" ")[1]

            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get user from id as token contains userID
            req.user = await User.findById(decoded.id).select('-password')

            // end middle ware
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")

        }
    }

    if(!token) {
        res.status(401)
        throw new Error("not authorized, no token")
    }
}

module.exports = {protect,}