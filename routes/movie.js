const express = require("express");
const { sequelize, Movie, User } = require("../models");
const Joi= require("joi");
const jwt= require("jsonwebtoken");
require('dotenv').config();


function authToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.status(401).json({msg:err});

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
    const movies = await Movie.findAll();
    return res.json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const movieById = await Movie.findByPk(req.params.id);
    return res.json(movieById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");

route.get("/findMovie/:q", async (req, res) => {
  try {
    const matchingMovie = await Movie.findAll({
      where: {
        tittle: {
          [Op.substring]: req.params.q,
        },
        genre: {
          [Op.substring]: req.params.q,
        },
        duration: {
          [Op.eq]: req.params.q,
        },
      },
    });
    return res.json(matchingMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addMovie", async (req, res) => {
  try {

    const shema= Joi.object().keys({
     tittle: Joi.string().trim().required(),
     genre:Joi.string().trim().required(),
     duration:Joi.number().required()
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

        
    const newMovie = await Movie.create(req.body);
    return res.json(newMovie);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editMovie/:id", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      tittle: Joi.string().trim().required(),
      genre:Joi.string().trim().required(),
      duration:Joi.number().required()
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
      

      const movieToEdit = await Movie.findByPk(req.params.id);
      movieToEdit.tittle = req.body.tittle;
      movieToEdit.genre = req.body.genre;
      movieToEdit.duration = req.body.duration;
      movieToEdit.save();
      return res.json(movieToEdit);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteMovie/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){

      const movieToDelete = await Movie.findByPk(req.params.id);
    await movieToDelete.destroy();
    return res.json(movieToDelete);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
