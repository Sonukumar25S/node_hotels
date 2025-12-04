
const express=require('express');
const app=express();
app.use(express.json());
const db=require('./db');





const menuroutes=require('./Routes/menuroutes');



app.use('/menu',menuroutes);


app.listen(3000,()=>{
    console.log("server is running");
});