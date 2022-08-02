import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Firstname:{
        type: String,
        required: true,

    },
    Lastname:{
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl:{
        type: String,
        required: false
    }

});

export = mongoose.model("Profile", userSchema);