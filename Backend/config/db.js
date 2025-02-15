const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;

//irWkQE08VcxFU5wL jakariyakabirriyad