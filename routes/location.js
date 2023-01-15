const express = require("express");
const { sequelize, Location, User } = require("../models");

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
    const locations = await Location.findAll();
    return res.json(locations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

// req.params.naziv_atributa se koristi kada atribute dajem u url
// req.body.naziv_atributa se koristi kada se nalazi u body http zahteva

route.get("/:id", async (req, res) => {
  try {
    const locationById = await Location.findByPk(req.params.id);
    return res.json(locationById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");
route.get("/findLocation/:q", async (req, res) => {
  try {
    const matchingLocations = await Location.findAll({
      where: {
        [Op.or]: {
          street_name: {
            [Op.substring]: req.params.q,
          },
          city_name: {
            [Op.substring]: req.params.q,
          },
        },
      },
    });
    return res.json(matchingLocations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

// body jer su podaci unutar http  body-ja
route.post("/addLocation", async (req, res) => {
  try {
    const shema= Joi.object().keys({
     street_name: Joi.string().trim().required(),
     city_name:Joi.string().trim().required()
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

      const newLocation = await Location.create(req.body);
      return res.json(newLocation);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editLocation/:id", async (req, res) => {
  try {
   
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      street_name: Joi.string().trim().required(),
      city_name:Joi.string().trim().required()
     });


    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){

      const {error,success}=shema.validate(req.body);

      if(error){
        res.status(400).json({msg:"Greska-forma " + error.details[0].message});
        return;
      }
        
      const locationToEdit = await Location.findByPk(req.params.id);
      locationToEdit.street_name = req.body.street_name;
      locationToEdit.city_name = req.body.city_name;
      locationToEdit.save();
      return res.json(locationToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteLocation/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
       
    const locationToDelete = await Location.findByPk(req.params.id);
    await locationToDelete.destroy();
    return res.json(locationToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
