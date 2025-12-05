
const express=require('express');
require('dotenv').config();
const app=express();
app.use(express.json());
const db=require('./db');



// Import the router files
const personroutes = require('./Routes/personroutes');
const menuroutes=require('./Routes/menuroutes');

// Use the routers
app.use('/person', personroutes);
app.use('/menu',menuroutes);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running");
});