const mongoose = require('mongoose');

const FetchPersonalsSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})

module.exports = mongoose.model('FetchPersonals', FetchPersonalsSchema)