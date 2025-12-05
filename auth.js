const passport=require('passport');
const localstrategy=require('passport-local').Strategy; 
const person = require('./model/person');

passport.use(new localstrategy(async (username,password,done)=>{
    try{
            //console.log('Recevied credentials',username,password);
            const user=await person.findOne({username:username});
            if(!user)
            {
                  return done(null,false,{message:'Incorrect username'});
            }
             //const ispassword=user.password===password?true:false;
             const ispassword=await user.comparepassword(password);
             if(ispassword)
             {
                return done(null,user);
             }
             else{
                return done(null,false,{message:'Incorrect password'});
             }
    }
    catch(err)
    {
        return done(err);
    }
}))

module.exports=passport;
