const mongoose = require("mongoose");

schema = mongoose.Schema

doctorModel = new schema({
    phoneNumber: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    specialty: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('doctor', doctorModel)