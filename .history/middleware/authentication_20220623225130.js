const jwt = require('jsonwebtoken')
const { UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {userId,name,role } = decoded
    req.user = { userId,name,role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

 const authorizedPermission=(req,res,next)=>{
    console.log('check')
    if(req.user.role !=='admin'){
        throw new UnauthorizedError('Unauthorized to acess this route')
    }
    next()
} 

module.exports = {authorizedPermission,authenticationMiddleware}

