const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    coins:{
        type: Number,
    }
})

module.exports = mongoose.model('User_Details',userSchema)