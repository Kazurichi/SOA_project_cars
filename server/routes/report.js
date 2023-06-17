const express = require('express')
const router = express.Router()
const Report=require('../models/Report');
const Damage=require('../models/Damage');
const User=require('../models/User');

const Subscription=require('../models/Subscription');
const multer = require("multer");
const fs = require("fs");
const { log } = require('console');
const JWT_KEY = 'SOAcars';
const jwt = require("jsonwebtoken");
const Joi = require('joi').extend(require('@joi/date'));
const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const {QueryTypes} = require('sequelize');

router.use(express.json()) 
router.use(express.urlencoded({ extended: true }));

const upload = multer({
    dest: "./server/uploads",
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
    if(reporterdata.role == 2 && reporterdata.authorized == 1){
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
    fs.renameSync(`./server/uploads/${req.file.filename}`, `./server/uploads/${filename}`);


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


router.get("/test/:id?",async(req,res)=>{
  let id = req.query.id;
  if(id !=null){
    return res.status(400).send("yes id : " +id)
  }
  else{
    return res.status(400).send("no id :"+id)
  }
  
})

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
        if(reporterdata.role == 2 && reporterdata.authorized == 1){
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
            reporter_id:reporterdata.idx,
            description:description,
        });
        return res.status(200).send({
          Message: 'Success Insert Report',
          Car_idx:car_idx,
          Type:type,
          Title:title,
          Location:location,
          Description:description,
          Reporter_id:reporterdata.idx,
          Reporter_Name:reporterdata.username,
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
  let idxcar= req.query.id
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
     let id = check.idx;
      let getHit = await Subscription.findOne({
        where:{
            id_user:check.idx
        }
    });
      let api_hit = getHit.content_access;
      if(api_hit==0){
        return res.status(200).send("Tidak bisa mendapatkan report karena sudah mencapai batas!");
      }
      else{
        if (idxcar != null) {
          let getreport = await Report.findAll({ where: { car_idx: idxcar } });
            if (!getreport) {
                return res.status(404).send("Report not found")
            }
            let updateHit = await sequelize.query(
              `UPDATE subscriptions SET content_access = content_access - 1 WHERE id_user = ?;
              `,
              {
                  replacements:[
                      id
                  ],
                  type: QueryTypes.UPDATE 
              }
            )
            return res.status(200).send(getreport);
        }
        else{
          console.log("masuk");
          let updateHit = await sequelize.query(
            `UPDATE subscriptions SET content_access = content_access - 1 WHERE id_user = ?;
            `,
            {
                replacements:[
                    id
                ],
                type: QueryTypes.UPDATE 
            }
          )
            return res.status(200).send(await Report.findAll());
        }
      }
    }

  }catch(err){
    console.log(err);
    return res.status(400).send('Invalid JWT Key!')
  }
});

module.exports = router