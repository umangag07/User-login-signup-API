const jwt = require('jsonwebtoken')
require("dotenv/config")

module.exports = (req,res,next)=>{
    try{
        //  console.log(req.headers.authorization.split(' ')[1]);
         const token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token,process.env.JWT_KEY);
        console.log(req.userData)
        req.userData = decoded
        console.log(req.userData)
         
         next();
    }catch(err){
        return res.status(401).send({message:"User Auth failed token not verified"})
    }
}