const mongoose = require('mongoose');

const emergencyContactSchema = mongoose.Schema({
    name: String,
    phonenum: {type: Number, unique: true}
})

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);