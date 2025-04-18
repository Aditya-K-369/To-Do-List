const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
const appRoutes = require('./routes/app');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', appRoutes);
app.listen(process.env.PORT);
