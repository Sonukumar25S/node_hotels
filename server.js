
const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

//middleware
app.use(express.json());
function logrequest(req,res,next)
{
    console.log(`${[new Date().toLocaleString()]} Request made to ${req.url}`);
    next();
}
app.use(logrequest);
app.use(passport.initialize());
const localAuthmiddleware=passport.authenticate('local',{session:false});

// Import the router files
const personroutes = require('./Routes/personroutes');
const menuroutes=require('./Routes/menuroutes');



// Use the routers
app.use('/person',localAuthmiddleware,personroutes);
app.use('/menu',menuroutes);
app.get('/',(req,res)=>{
    res.send('welcome to my hotel')
})


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running");
});