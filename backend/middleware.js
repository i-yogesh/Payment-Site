const {JWT_SECRET} =  require("./config");
const jwt = require("jsonwebtoken");
const authMiddleWare = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"error"});
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({err});
    }
}
module.exports = {
    authMiddleWare
}