const mongoose = require('mongoose');

const PersonalsSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})

module.exports = mongoose.model('Personals', PersonalsSchema)
