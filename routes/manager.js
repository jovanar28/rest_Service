const express = require("express");
const { sequelize, Manager, User } = require("../models");

const Joi= require("joi");

const jwt= require("jsonwebtoken");
require('dotenv').config();


function authToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.status(401).json({msg: err});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) return res.status(403).json({msg:err});

      req.user = user;

      next();
  });
}

const route = express.Router();

route.use(authToken);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const managers = await Manager.findAll();
    return res.json(managers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const managerById = await Manager.findByPk(req.params.id);
    return res.json(managerById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");
route.get("/findManager/:q", async (req, res) => {
  try {
    const matchingManagers = await Manager.findAll({
      where: {
        [Op.or]: {
          first_name: {
            [Op.substring]: req.params.q,
          },
          last_name: {
            [Op.substring]: req.params.q,
          },
          username: {
            [Op.substring]: req.params.q,
          },
        },
      },
    });
    return res.json(matchingManagers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addManager", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      first_name: Joi.string().trim().min(2).max(40).required(),
      last_name:Joi.string().trim().min(2).max(40).required(),
      username:Joi.string().trim().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
      password:Joi.string().trim().pattern(new RegExp("(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$")).required()
     });

     
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma" + error.details[0].message});
        return;
      }
      const newManager = await Manager.create(req.body);
      return res.json(newManager);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editManager/:id", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      id: Joi.number().required(),
      first_name: Joi.string().trim().min(2).max(40).required(),
      last_name:Joi.string().trim().min(2).max(40).required(),
      username:Joi.string().trim().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
      password:Joi.string().trim().pattern(new RegExp("(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$")).required()
     });


    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){

      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma" + error.details[0].message});
        return;
      }

    const newManager = await Manager.findByPk(req.params.id);
    newManager.first_name = req.body.first_name;
    newManager.last_name = req.body.last_name;
    newManager.username = req.body.username;
    newManager.password = req.body.password;
    await newManager.save();

    return res.json(newManager);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteManager/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const managerToDelete = await Manager.findByPk(req.params.id);
      await managerToDelete.destroy();
      return res.json(managerToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
