import jwt from "jsonwebtoken"

// isverified validations
const isVerified = async( req, res, next) => {
  const{token} = req.cookies
  if(token) {
    const isveriified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    if(isveriified) {
      req.user = isveriified
      res.status(200).json({message : "AuthorisedAccess", success: true, token: token})
      // go to the next controller
      next()
    } else {
      res.status(400).json({message: "tokenNotVerified", success: false})
    }

  } else {
    res.status(400).json({message: "badRequest", success: false})
  }
}


export default isVerified