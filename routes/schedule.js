const express = require("express");
const { sequelize, Schedule, User } = require("../models");

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
    const sch = await Schedule.findAll();
    return res.json(sch);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const schById = await Schedule.findByPk(req.params.id);
    return res.json(schById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addSchedule", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      start_time: Joi.string().required(),
      end_time:Joi.string().required(),
      date:Joi.string().required(),
      auditorium_sch_id:Joi.number().required(),
      movie_sch_id:Joi.number().required(),

       });

    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma" +  error.details[0].message});
        return;
      }
      
      const newSchedule = await Schedule.create(req.body);
      return res.json(newSchedule);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editSchedule/:id", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      start_time: Joi.number().required(),
      end_time:Joi.number().required(),
      date:Joi.number().required(),
      auditorium_sch_id:Joi.number().required(),
      movie_sch_id:Joi.number().required(),

       });

    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma"});
        return;
      }
      const schToEdit = await Schedule.findByPk(req.params.id);
      schToEdit.start_time = req.body.start_time;
      schToEdit.end_time = req.body.end_time;
      schToEdit.date = req.body.date;
      schToEdit.auditorium_sch_id = req.body.auditorium_sch_id;
      schToEdit.movie_sch_id = req.body.movie_sch_id;
      schToEdit.save();
      return res.json(schToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteSchedule/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const schToDelete = await Schedule.findByPk(req.params.id);
      await schToDelete.destroy();
      return res.json(schToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
