const express = require("express");
const { sequelize, Auditorium,User } = require("../models");

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
    const auditorium = await Auditorium.findAll();
    return res.json(auditorium);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const auditoriumById = await Auditorium.findByPk(req.params.id);
    return res.json(auditoriumById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");
const user = require("../models/user");

route.get("/findAuditorium/:q", async (req, res) => {
  try {

    const matchingAuditorium = await Auditorium.findAll({
      where: {
        number_of_seats: {
          [Op.eq]: req.params.q,
        },
      },
    });
    return res.json(matchingAuditorium);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addAuditorium/", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      number_of_seats: Joi.number().required(),
      movietheater_id: Joi.number().required()
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

      const newAuditorium = await Auditorium.create(req.body);
      return res.json(newAuditorium);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editAuditorium/:id", async (req, res) => {
  try {
    const shema = Joi.object().keys({
      id: Joi.number().required(),
      number_of_seats: Joi.number().required(),
      movietheater_id: Joi.number().required()
    });

    const user=await User.findOne({
      where:{
        id: req.user.userId
      }
    });

    if(user.role_id==1){

      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma"});
        return;
      }
      
      const auditoriumToEdit = await Auditorium.findByPk(req.params.id);
      auditoriumToEdit.number_of_seats = req.body.number_of_seats;
      auditoriumToEdit.movietheater_id = req.body.movietheater_id;

      auditoriumToEdit.save();
      return res.json(auditoriumToEdit);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteAuditorium/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const auditoriumToDelete = await Auditorium.findByPk(req.params.id);
      await auditoriumToDelete.destroy();
      return res.json(auditoriumToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
