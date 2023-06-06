const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subsrciption = require('../models/Subscription')
const Joi = require('joi').extend(require('@joi/date'));
const jwt = require("jsonwebtoken");
const Tier = require('../models/Tier');
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
        role:1 //user role
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
    let tiers = await Tier.findAll();
    if(tiers.length>0){
        return res.status(200).send({
            tiers
        });
    }
    else{
        return res.status(404).send({
            message:"No tier found"
        });
    }
    
});

//Felix
router.post("/subsrciption",async(req,res)=>{
    let token = req.header('x-auth-token');

    if(!req.header('x-auth-token')){
        return res.status(400).send('Authentication token is missing');
    }
    let userdata = jwt.verify(token, JWT_KEY);
    
    if(userdata.role == 1){
        let {tier} = req.body;

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

        let login = await User.findOne({
            where:{
                idx:userdata.idx
            }
        });

        if(login){
            let amount = login.content_access + getTier.content_access;

            let updateUser = await User.update({
                content_access: amount
            },{
                where:{
                    idx:userdata.idx
                }
            });
            
            return res.status(200).send({
                message:"Subscribe",
                tier:tier,
                price:getTier.price,
                left_access:`${amount} `
            });
        }
        
        return res.status(404).send({
            message:"User Not Found",
        });
        
    }
    else{
        return res.status(403).send({
            message:"Unauthorized"
        });
    }

});

//Felix
router.get("/profile", async(req,res)=>{
    let token = req.header('x-auth-token');

    if(!req.header('x-auth-token')){
        return res.status(400).send('Authentication token is missing');
    }
    let userdata = jwt.verify(token, JWT_KEY);
    
    if(userdata.role == 1){
        let user = await User.findOne({
            
        },{
            where:{
                idx:userdata.idx
            }
        });

        return res.status(200).send({
            message:"Profile",
            user
        });
    }
    else{
        return res.status(403).send({
            message:"Unauthorized"
        });
    }
});

module.exports = router;