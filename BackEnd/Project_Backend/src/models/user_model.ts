import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  imageUrl:{
    type: String,
    required: false
  },
});

export = mongoose.model("User", userSchema);
