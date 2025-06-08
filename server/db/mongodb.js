require("dotenv").config();

const mongoose = require("mongoose");

const connect = async () => {

  try {
   await mongoose.connect(process.env.MONGODB_URL);
 
    console.log(` DB  Connected  `);
    
  } catch (error) {
    console.log(` DB disconnected ${error}`);
  }

};

module.exports=connect
