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
        password:Joi.string().required(),
        name:Joi.string().required()
    });

    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        return res.status(403).send(error.toString())
    }

    let newUser = User.create({
        email:email,
        username:username,
        password:password,
        name:name,
        account_type:"-",
        API_KEY:"",
    });

    let body = {
        message:"User Registered Successfully",
        email:email,
        username:username,
        name:name,
    }

    return res.status(201).send({
        body
    });

});

//Felix
router.post("/login",async(req,res)=>{
    let {email,password} = req.body;

    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(403).send(error.toString())
    }

    return res.status(403).send();

});

//Felix
router.get("/tiers",async(req,res)=>{
    
});

//Felix
router.post("/subsrciption",async(req,res)=>{
    
});

module.exports = router