import joi from 'joi'
// server side validation through the joi library or package.


//signup validation
const signupvalidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(4).max(15).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(10).required()
  });
  const{error} = schema.validate(req.body);
  if(error) {
    return res.status(400).json({message : "Bad request", error})
  }
  next()
}


// login validation
const loginvalidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(15).required()
  });
  const{error} = schema.validate(req.body);
  if(error) {
    return res.status(400).json({message : "Bad request", error})
  }
  next()
}




export { signupvalidation, loginvalidation}

