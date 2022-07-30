import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    }
})

export = mongoose.model('Post',profileSchema)