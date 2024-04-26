import jwt from 'jsonwebtoken';


export const auth=(req,res,next)=>{
    try {
        const token= req.header('x-auth-token')
        jwt.verify(token,process.env.SECRETKEY)
        next()
    } catch (error) {
        res.status(401).send({error:error.message})
    }
  
}