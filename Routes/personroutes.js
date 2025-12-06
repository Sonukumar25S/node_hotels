const express = require('express');
const router = express.Router();
const Person = require('./../model/person');
const {jwtauthmiddleware,generatetoken}=require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database 
        const response = await newPerson.save();
        console.log('data saved');
        const payload={
            id:response.id,
            username:response.username
        }
        const token=generatetoken(payload);
        res.status(200).json({respone:response,token:token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// login route
router.post('/login',async(req,res)=>{
    try{

    //extract the data from request body
    const {username,password}=req.body;
    //find the user by username
       const user=await Person.findOne({username:username});

       // if user does not exist or password does not match, return error
       if(!user ||!(await user.comparepassword(password))){
        return res.status(401).json({error:'invalid username or password'});
       }
          //generate tokens
          const payload={
            id:user.id,
            username:user.username
          }
          const token=generatetoken(payload);
          //return token as response
          res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'internal server error'})

    }


})
 // profile route
 router.get('/profile',jwtauthmiddleware,async(req,res)=>{
    try{
          const userdata=req.user;
          console.log("user data",userdata);
          const userid=userdata.id;
          const user=await Person.findById(userid);
          res.status(200).json({user});
           
    }  
    catch(err)
    {
         console.log(err);
        res.status(500).json({err:'internal server error'})

    }
 })
  //get method to get the person
router.get('/',jwtauthmiddleware,async(req,res)=>{
         try{
                const data=await Person.find();
                console.log('response fetched');
                res.status(200).json(data);
         }
         catch(err){
                    res.status(500).json({message:'Internal server error'});
         }
})


router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType; // // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;