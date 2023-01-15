const express = require("express");
const { sequelize, Payment,User } = require("../models");

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
    const payments = await Payment.findAll();
    return res.json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const paymentById = await Payment.findByPk(req.params.id);
    return res.json(paymentById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");
//?

route.post("/addPayment", async (req, res) => {
  try {

    const shema= Joi.object().keys({
     user_pay_id: Joi.number().required(),
     seat_pay_id:Joi.number().required(),
     auditorium_pay_id:Joi.number().required(),
     movie_pay_id:Joi.number().required(),
     sch_pay_id:Joi.number().required(),
     res_pay_id:Joi.number().required(),
     amount:Joi.number().required(),
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

      const newPayment = await Payment.create(req.body);
      return res.json(newPayment);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editPayment/:id", async (req, res) => {
  try {

    const shema= Joi.object().keys({
      id: Joi.number().required(),
      user_pay_id: Joi.number().required(),
      seat_pay_id:Joi.number().required(),
      auditorium_pay_id:Joi.number().required(),
      movie_pay_id:Joi.number().required(),
      sch_pay_id:Joi.number().required(),
      res_pay_id:Joi.number().required(),
      amount:Joi.number().required(),
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
      
      const paymentToEdit = await Payment.findByPk(req.params.id);
      paymentToEdit.user_pay_id = req.body.user_pay_id;
      paymentToEdit.seat_pay_id = req.body.seat_pay_id;
      paymentToEdit.auditorium_pay_id = req.body.auditorium_pay_id;
      paymentToEdit.movie_pay_id = req.body.movie_pay_id;
      paymentToEdit.sch_pay_id = req.body.sch_pay_id;
      paymentToEdit.res_pay_id = req.body.res_pay_id;
      paymentToEdit.amount = req.body.amount;
      paymentToEdit.save();
      return res.json(paymentToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deletePayment/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){

      const paymentToDelete = await Payment.findByPk(req.params.id);
      await paymentToDelete.destroy();
      return res.json(paymentToDelete);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
