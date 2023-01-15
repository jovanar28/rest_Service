const express = require("express");
const { sequelize, MovieTheater, User } = require("../models");

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
    const movietheaters = await MovieTheater.findAll();
    return res.json(movietheaters);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const movietheaterById = await MovieTheater.findByPk(req.params.id);
    return res.json(movietheaterById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");

route.get("/findMovietheater/:q", async (req, res) => {
  try {
    const matchingMt = await MovieTheater.findAll({
      where: {
        name: {
          [Op.substring]: req.params.q,
        },
      },
    });
    return res.json(matchingMt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addMovietheater", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      name: Joi.string().trim().required(),
     location_id:Joi.number().required(),
     manager_id:Joi.number().required()
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

      const newMovietheater = await MovieTheater.create(req.body);
      return res.json(newMovietheater);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editMovietheater/:id", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      id: Joi.number().required(),
    name: Joi.string().trim().required(),
     location_id:Joi.number().required(),
     manager_id:Joi.number().required()
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
      
      const movietheaterToEdit = await MovieTheater.findByPk(req.params.id);
      movietheaterToEdit.name = req.body.name;
      movietheaterToEdit.location_id = req.body.location_id;
      movietheaterToEdit.manager_id = req.body.manager_id;
      movietheaterToEdit.save();
      return res.json(movietheaterToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteMovietheater/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const movietheaterToDelete = await MovieTheater.findByPk(req.params.id);
      await movietheaterToDelete.destroy();
      return res.json(movietheaterToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
