const express = require('express')
const router = express.Router()
const Report=require('../models/Report');
const Damage=require('../models/Damage');
const multer = require("multer");
const fs = require("fs");
const { log } = require('console');
const JWT_KEY = 'SOAcars';
const jwt = require("jsonwebtoken");
const Joi = require('joi').extend(require('@joi/date'));
const bodyParser = require("body-parser");
const app = express();

router.use(express.json()) 
router.use(express.urlencoded({ extended: true }));

const upload = multer({
    dest: "./uploads",
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      if (file.mimetype != "image/png" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg") {
        return cb(new Error("Wrong file type"), null);
      }
      cb(null, true);
    },
  });



// post damage+picture
// Part/bagian yg kena tabrakan, gambar damage mobil, penyebab (cause) 
//estimated repair cost
// gambar damaged  
router.post("/damage",async(req,res)=>{
  let {car_idx,type,title,location,description} = req.body
  let token = req.header('x-auth-token')
  if(!req.header('x-auth-token')){
      return res.status(400).send('Authentication token is missing')
  }
  try{
    let reporterdata = jwt.verify(token, JWT_KEY);
    if(reporterdata.role == 2){
      const uploadFunc = upload.single("image");
uploadFunc(req, res, async function(err){
    if(err){
      return res.status(400).send({...err, msg:"wrong filetype"});
    }
    let {car_idx, description, estimated} = req.body
    const schema = Joi.object({
      car_idx: Joi.number().min(1).required(),
      description: Joi.string().required(),
      estimated:Joi.number().min(1).required(),
  })
  try {
      await schema.validateAsync(req.body)
  } catch (error) {
      return res.status(403).send(error.toString())
  }
    // const files = fs.readdirSync("./uploads");
    // const index = files.length + 1;
    const filename = `${car_idx}_${req.file.originalname}`;
    fs.renameSync(`./uploads/${req.file.filename}`, `./uploads/${filename}`);


    let insDamage=await Damage.create({
      car_idx:car_idx,
      description:description,
      estimated:estimated,
      picture:filename,
  });

    return res.status(200).send({
      Message: "Suceess Insert Damage",
      car_idx:car_idx,
      description:description,
      image:req.file.originalname,
    });
  });
    }
    else{
      return res.status(400).send({
        message: 'Unauthorized'
    })
  }
  }catch(err){
      console.log(err);
      return res.status(400).send('Invalid JWT Key!')
  }
});




//post report registration
// taxi, theft, activity, km, usage
router.post("/",async(req,res)=>{
    let {car_idx,type,title,location,description} = req.body
    let token = req.header('x-auth-token')
    if(!req.header('x-auth-token')){
        return res.status(400).send('Authentication token is missing')
    }
    try{
      let reporterdata = jwt.verify(token, JWT_KEY);
        if(reporterdata.role == 2){
              const schema = Joi.object({
              car_idx: Joi.number().min(1).required(),
              type: Joi.string().valid("taxi", "theft", "activity", "km", "usage").insensitive().required(), 
              title: Joi.string().required(),
              location: Joi.string().required(),
              description: Joi.string().required(),
          })
          try {
              await schema.validateAsync(req.body)
          } catch (error) {
              return res.status(403).send(error.toString())
          }
          let insReport=await Report.create({
            car_idx:car_idx,
            type:type,
            title:title,
            location:location,
            reporter_id:reporterdata.id_reporter,
            description:description,
        });
        return res.status(200).send({
          message: 'Success Insert Report',
          car_idx:car_idx,
          type:type,
          title:title,
          location:location,
          reporter_id:reporterdata.id_reporter,
          description:description,
      })
        }
        else{
            return res.status(400).send({
              message: 'Unauthorized'
          })
        }
    }
    catch(err){
      console.log(err);
      return res.status(400).send('Invalid JWT Key!')
    }
});




//get all report details
router.get("/:id?",async(req,res)=>{
  //cek token
  //cek user valid
  //cek user punya subs
  //if not null
  let idxcar= req.params.id
  let token = req.header('x-auth-token')
  if(!req.header('x-auth-token')){
      return res.status(400).send('Authentication token is missing')
  }
  try{
    let check = jwt.verify(token, JWT_KEY);
    if(check.role != 1){
      if (idxcar!=null) {
        let getreport = await Report.findAll({ where: { car_idx: idxcar } });
          if (!getreport) {
              return res.status(404).send("Report not found")
          }
          return res.status(200).send(getreport);
      }else{
          return res.status(200).send(await Report.findAll());
      }
    }
    else{
      return res.status(200).send("user");
    }

  }catch(err){
    console.log(err);
    return res.status(400).send('Invalid JWT Key!')
  }
});






module.exports = router