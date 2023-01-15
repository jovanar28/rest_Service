const express = require("express");
const { sequelize, Ticket , User} = require("../models");

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
    const tickets = await Ticket.findAll();
    return res.json(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const ticketById = await Ticket.findByPk(req.params.id);
    return res.json(ticketById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");

route.get("/findTicket/:q", async (req, res) => {
  try {
    const matchingTicket = await Ticket.findAll({
      where: {
        price: {
          [Op.substring]: req.params.q,
        },
      },
    });
    return res.json(matchingTicket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addTicket", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      price:Joi.number().required(),
      user_tk_id: Joi.number().required(),
      seat_tk_id:Joi.number().required(),
      auditorium_tk_id:Joi.number().required(),
      movie_tk_id:Joi.number().required(),
      sch_tk_id:Joi.number().required(),
      ticket_res_id:Joi.number().required()
     
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

      const newTicket = await Ticket.create(req.body);
      return res.json(newTicket);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editTicket/:id", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      price:Joi.number().required(),
      user_tk_id: Joi.number().required(),
      seat_tk_id:Joi.number().required(),
      auditorium_tk_id:Joi.number().required(),
      movie_tk_id:Joi.number().required(),
      sch_tk_id:Joi.number().required(),
      ticket_res_id:Joi.number().required()
     
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

      const ticketToEdit = await Ticket.findByPk(req.params.id);
      ticketToEdit.price = req.body.price;
      ticketToEdit.user_tk_id = req.body.user_tk_id;
      ticketToEdit.seat_tk_id = req.body.seat_tk_id;
      ticketToEdit.auditorium_tk_id = req.body.auditorium_tk_id;
      ticketToEdit.movie_tk_id = req.body.movie_tk_id;
      ticketToEdit.sch_tk_id = req.body.sch_tk_id;
      ticketToEdit.ticket_res_id = req.body.ticket_res_id;
      ticketToEdit.save();
      return res.json(ticketToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteTicket/:id", async (req, res) => {
  try {

    const user = await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id == 1){
      const ticketToDelete = await Ticket.findByPk(req.params.id);
      await ticketToDelete.destroy();
      return res.json(ticketToDelete);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
