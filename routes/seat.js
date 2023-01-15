const express = require("express");
const { sequelize, Seat, User } = require("../models");

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
    const seats = await Seat.findAll();
    return res.json(seats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const seatById = await Seat.findByPk(req.params.id);
    return res.json(seatById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addSeat", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      auditorium_seat_id: Joi.number().required(),

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
      
      const newSeat = await Seat.create(req.body);
      return res.json(newSeat);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editSeat/:id", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      id: Joi.number().required(),
      auditorium_seat_id: Joi.number().required(),

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
      
      const seatToEdit = await Seat.findByPk(req.params.id);
      seatToEdit.auditorium_seat_id = req.body.auditorium_seat_id;
      seatToEdit.save();
      return res.json(seatToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteSeat/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const seatToDelete = await Seat.findByPk(req.params.id);
      await seatToDelete.destroy();
      return res.json(seatToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
