const express = require('express')
const router = express.Router()

const Car=require('../models/Car');
const Manufacturer=require('../models/Manufacturer');
const Car_manufacturer=require('../models/Car_manufacturer');
const axios=require('axios');
const jwt=require('jsonwebtoken');

const JWT_KEY = 'SOAcars'
//Kevin
router.get("/:vin?",async(req,res)=>{
    return res.status(200).send(await Car.findAll());
})
//Kevin
router.post("/manufacturer/add",async(req,res)=>{
    let inputs={...req.body};
    let id_manufacturer="";
    let token = req.header('x-auth-token')
    if(!req.header('x-auth-token')){
        return res.status(403).send({"messsage":'Authentication Required'})
    }
    try {
        let userdata = jwt.verify(token, JWT_KEY)
        if (userdata.role!=3) {
            return res.status(403).send({"messasge":"Unauthorized Access"});
        }
        id_manufacturer=userdata.idx;
    } catch (error) {
        return res.status(403).send({"message":'Invalid JWT Key'})
    }
    let manufacturer_data=await Manufacturer.findByPk(id_manufacturer);
    if (manufacturer_data.authorized==0) {
        return res.status(403).send("Cannot post request,this user needs admin's approval.");
    }
    if (typeof inputs === 'object' && inputs !== null && Object.keys(inputs).length > 0) {
        let {model,manufacturer,fuel_type,drive,cylinders,transmission,year}='';
        if (inputs.model!=null) {
            model=inputs.model
        }
        if (inputs.manufacturer!=null) {
            manufacturer=inputs.manufacturer
        }
        if (inputs.fuel_type!=null) {
            fuel_type=inputs.fuel_type
        }
        if (inputs.drive!=null) {
            drive=inputs.drive
        }
        if (inputs.cylinders!=null) {
            cylinders=inputs.cylinders
        }
        if (inputs.transmission!=null) {
            transmission=inputs.transmission
        }
        if (inputs.year!=null) {
            year=inputs.year
        }
        let api_car=await axios.get('https://api.api-ninjas.com/v1/cars', {
            params: {
            'model': inputs.model,
            'make': inputs.manufacturer,
            'fuel_type': inputs.fuel_type,
            'drive': inputs.drive,
            'cylinders': inputs.cylinders,
            'transmission': inputs.transmission,
            'year': inputs.year,
            'limit':'1'
            },
            headers: {
            'accept': 'application/json',
            'X-Api-Key': 'Ir0NxLEnYpbDUmRS756CSg==g8eQQm0Cl53jqHnZ'
            }
        });
        
        if (api_car.data.length==0) {
            return res.status(404).send("car not found");
        }else{
            let insert=await Car_manufacturer.create({
                model:api_car.data[0].model,
                idx_manufacturer:id_manufacturer,
                fuel_type:api_car.data[0].fuel_type,
                year:api_car.data[0].year,
                drive:api_car.data[0].drive,
                transmission:api_car.data[0].transmission,
                cylinders:api_car.data[0].cylinders,
            });

            return res.status(200).send(insert);
        }

    }else{
        return res.status(400).send("please fill a paramater (model/manufacturer/fuel_type/drive/cylinders/transmission/year)");
    }

});

//update
router.put("/:vin",async(req,res)=>{

})
//delete
router.put("/:vin",async(req,res)=>{

})
module.exports = router