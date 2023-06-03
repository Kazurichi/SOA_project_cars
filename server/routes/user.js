const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Joi = require('joi').extend(require('@joi/date'));

//Felix
const checkUniqueEmail = async (email) => { 
    let user = await User.findOne({
        where:{
            email:email
        }
    });

    if(user){
        throw new Error("Email Already Registered");
    }
};

router.post("/register",async(req,res)=>{
    let {email,username,password,name} = req.body;
    const schema = Joi.object({
        email: Joi.string().email().external(checkUniqueEmail).required(),
        username: Joi.string().required(),
        password:Joi.string().required()
    });
});

//Felix
router.post("/login",async(req,res)=>{
    let {email,password} = req.body;
});

//Felix
router.get("/tiers",async(req,res)=>{
    
});

//Felix
router.post("/subsrciption",async(req,res)=>{
    
});

module.exports = router