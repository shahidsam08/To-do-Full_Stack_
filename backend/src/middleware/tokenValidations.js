import jwt from "jsonwebtoken"

// isverified validations
const isVerified = async( req, res, next) => {
  try {
    const{token} = req.cookies
  if(token) {
    const isveriified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    if(isveriified){
      req.user = isveriified
      // console.log(req.user)
      next()
    } else {
      res.json("token is expired")
    }
  } else {
    res.status(401).json({message: "badRequest", success: false})
  }
  } catch (error) {
    console.log("The error is : ", error)
  }
}


export default isVerified