const express = require("express");
const { sequelize, Reservation, User } = require("../models");

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
    const reservations = await Reservation.findAll();
    return res.json(reservations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const reservationById = await Reservation.findByPk(req.params.id);
    return res.json(reservationById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addReservation", async (req, res) => {
  try {
    
    const shema= Joi.object().keys({
      user_res_id: Joi.number().required(),
      seat_res_id:Joi.number().required(),
      auditorium_res_id:Joi.number().required(),
      movie_res_id:Joi.number().required(),
      schedule_id:Joi.number().required(),
     
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

      const newReservation = await Reservation.create(req.body);
      return res.json(newReservation);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editReservation/:id", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      user_res_id: Joi.number().required(),
      seat_res_id:Joi.number().required(),
      auditorium_res_id:Joi.number().required(),
      movie_res_id:Joi.number().required(),
      schedule_id:Joi.number().required(),
     
       });

    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const reservationToEdit = await Reservation.findByPk(req.params.id);
      reservationToEdit.user_res_id = req.body.user_res_id;
      reservationToEdit.seat_res_id = req.body.seat_res_id;
      reservationToEdit.auditorium_res_id = req.body.auditorium_res_id;
      reservationToEdit.movie_res_id = req.body.movie_res_id;
      reservationToEdit.schedule_id = req.body.schedule_id;
      reservationToEdit.save();
      return res.json(reservationToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteReservation/:id", async (req, res) => {
  try {
   
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      
      const reservationToDelete = await Reservation.findByPk(req.params.id);
      await reservationToDelete.destroy();
      return res.json(reservationToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
