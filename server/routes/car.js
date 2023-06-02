const express = require('express')
const router = express.Router()

const Car=require('../models/Car');

//Kevin
router.get("/:vin?",async(req,res)=>{
    return res.status(200).send(await Car.findAll());
})
//Kevin
router.post("/manufacturer/add",async(req,res)=>{
         

})

//update
router.put("/:vin",async(req,res)=>{

})
//delete
router.put("/:vin",async(req,res)=>{

})
module.exports = router