const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAccountVerified:{
    type: Boolean,
    default:false
  }
});

const user_models = mongoose.model("users", userSchema);

module.exports = { user_models };
