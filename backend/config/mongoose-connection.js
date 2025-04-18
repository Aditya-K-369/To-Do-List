const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});