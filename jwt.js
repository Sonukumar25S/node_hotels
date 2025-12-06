const jwt=require('jsonwebtoken');

const jwtauthmiddleware=(req,res,next)=>{

    //first check request headers has authorixation or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'token not found '});
    //extract the jwt token from the request headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"unauthorized"});
    try{
        //verify the token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //attach user information to get the request object
            req.user=decoded;
            next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'internal server error'});

    }
}


//function to generate jwt token

const generatetoken=(userdata)=>{
   //generate new token using user data
   return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn: 30000});
}
module.exports={jwtauthmiddleware,generatetoken};