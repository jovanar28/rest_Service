const express = require("express");
const { sequelize, User } = require("../models");

const Joi= require("joi");

const jwt=require('jsonwebtoken');
require('dotenv').config();


function authToken(req,res,next){
  const authHeader= req.headers['authorization'];
  const token= authHeader && authHeader.split(' ')[1];

  if(token==null) return res.status(401).json({msg:err});

  //ovde se proverava token od korisnika 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
    if(err)
      return res.status(403).json({msg:err});
    req.user= user;
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
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const userById = await User.findByPk(req.params.id);
    return res.json(userById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

const { Op } = require("sequelize");

route.get("/findUser/:q", async (req, res) => {
  try {
    const matchingUser = await User.findAll({
      where: {
        username: {
          [Op.substring]: req.params.q,
        },
      },
    });
    return res.json(matchingUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.put("/editUser/:id", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      id: Joi.number().required(),
      first_name: Joi.string().trim().min(2).max(40).required(),
      last_name:Joi.string().trim().min(2).max(40).required(),
      username:Joi.string().trim().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
      password:Joi.string().trim().pattern(new RegExp("(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$")).required(),
      credit_card_num: Joi.string().pattern(new RegExp("^(?:5[1-5][0-9]{14})$")).required(),
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

      const userToEdit = await User.findByPk(req.params.id);
      userToEdit.first_name = req.body.first_name;
      userToEdit.last_name = req.body.last_name;
      userToEdit.username = req.body.username;
      userToEdit.password = req.body.password;
      userToEdit.credit_card_num = req.body.credit_card_num;
     
      userToEdit.save();
      return res.json(userToEdit);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.post("/addUser", async (req, res) => {
  try {
    const shema= Joi.object().keys({
      first_name: Joi.string().trim().min(2).max(40).required(),
      last_name:Joi.string().trim().min(2).max(40).required(),
      username:Joi.string().trim().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
      password:Joi.string().trim().pattern(new RegExp("(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$")).required(),
      credit_card_num: Joi.string().pattern(new RegExp("^(?:5[1-5][0-9]{14})$")).required()
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


      const newUser = await User.create(req.body);
      return res.json(newUser);
    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
    
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/deleteUser/:id", async (req, res) => {
  try {
    const user= await User.findOne({
      where:{
        id:req.user.userId
      }
    });

    if(user.role_id==1){
      const userToDelete = await User.findByPk(req.params.id);
      await userToDelete.destroy();
      return res.json(userToDelete);

    }else{
      res.status(401).json({error:"Ne moze ovaj zahtev"});
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});
