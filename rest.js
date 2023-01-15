const express = require("express");
const path = require("path");
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const cors=require('cors');
require('dotenv').config();

const { sequelize, User} = require("./models");

var corsOptions={
    origin: '*',
    optionSuccessStatus: 200
}


const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const locationRoutes = require("./routes/location.js");
app.use("/admin/location", locationRoutes);

const managerRoutes = require("./routes/manager.js");
app.use("/admin/manager", managerRoutes);

const userRoutes = require("./routes/user.js");
app.use("/admin/user", userRoutes);

const auditoriumRoutes = require("./routes/auditorium.js");
app.use("/admin/auditorium", auditoriumRoutes);

const movieRoutes = require("./routes/movie.js");
app.use("/admin/movie", movieRoutes);

const moviethRoutes = require("./routes/movietheater.js");
app.use("/admin/movietheater", moviethRoutes);

const paymentRoutes = require("./routes/payment.js");
app.use("/admin/payment", paymentRoutes);

const reservationRoutes = require("./routes/reservation.js");
app.use("/admin/reservation", reservationRoutes);

const roleRoutes = require("./routes/role.js");
app.use("/admin/role", roleRoutes);

const scheduleRoutes = require("./routes/schedule.js");
app.use("/admin/schedule", scheduleRoutes);

const seatRoutes = require("./routes/seat.js");
app.use("/admin/seat", seatRoutes);

const ticketRoutes = require("./routes/ticket.js");
app.use("/admin/ticket", ticketRoutes);

app.listen({ port: 8000 }, async () => {
    console.log("Pokrenut na portu 8000");
});