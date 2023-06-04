const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subsrciption = require('../models/Subscription')
const Joi = require('joi').extend(require('@joi/date'));
const jwt = require("jsonwebtoken");
const JWT_KEY = 'SOAcars';
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

    let newUser = await User.create({
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

    
    let loginUser= await User.findOne({
        where:{
            email:email,
            password:password
        }
    });

    let token = jwt.sign({
        idx:loginUser.idx,
        username:loginUser.username,
        role:1 //manufacturer role
    }, JWT_KEY, {expiresIn: '3600s'})

    let updateUser = await User.update({
        API_KEY:token
    },{
        where:{
            email:email
        }
    });

    return res.status(200).send({
        message:`Welcome ${loginUser.name}`,
        API_KEY:token
    });

});

//Felix
router.get("/tiers",async(req,res)=>{
    
});

//Felix
router.post("/subsrciption",async(req,res)=>{
    let token = req.header('x-auth-token');

    if(!req.header('x-auth-token')){
        return res.status(400).send('Authentication token is missing');
    }

    let {tier, price} = req.body;

    const schema = Joi.object({
        tier:Joi.string().required(),
        price:Joi.number().required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(403).send(error.toString())
    }

    let getTier = await Subsrciption.findOne({
        where:{
            tier:tier
        }
    });

    return res.status(200).send({
        message:"Subscribe"
    });

});

module.exports = router