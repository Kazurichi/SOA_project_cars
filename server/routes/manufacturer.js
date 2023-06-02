const express = require('express')
const router = express.Router()
const Joi = require('joi').extend(require('@joi/date'))

//kevin
router.post("/register",async(req,res)=>{
    let inputs={req,body};
    const schema=Joi.object({
        username:Joi.string().required(),
        display_name:Joi.string(),
        password:Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).send({"message":error.details[0].message});
    }
});
//kevin
router.post("/login",async(req,res)=>{
    
});
module.exports = router