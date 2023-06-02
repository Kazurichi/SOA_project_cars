const express = require('express')
const router = express.Router()

const Car=require("./models/Car");

//get all cars/get specific car
router.get("/:vin?",async(req,res)=>{

})
//add car(manufacturer)
router.post("/",async(req,res)=>{

})
//update
router.put("/:vin",async(req,res)=>{

})
//delete
router.put("/:vin",async(req,res)=>{

})
module.exports = router