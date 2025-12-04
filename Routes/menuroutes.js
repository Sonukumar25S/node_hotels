const express=require('express');
const router=express.Router();
const menu=require('./../model/menu');

router.get('/:taste',async(req,res)=>{
    try{
    const tastetype=req.params.taste;
    if(tastetype=='spicy'|| tastetype=='sour'|| tastetype=='sweet')
    {
        const response=await menu.find({taste:tastetype});
        console.log('success');
        res.status(200).json(response);
    }
    else
    {
        res.status(404).json({err:'not found'});
    }}
    catch(err)
    
    {
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
});

module.exports=router;