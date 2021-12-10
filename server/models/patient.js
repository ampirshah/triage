const mongoose = require('mongoose')
const schema = mongoose.Schema

patientModel = new schema({
    fullName: {
        type: "string"
    },
    turn: {
        type: Number
    },
    numberOfChildren: {
        type: Number,
        default: 0
    },
    needTobeVisitBy: [{
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: 'doctor'
        },
        status:{
            type:String,
            enum: ["0","1","2"]
        }
    }]
});

module.exports = mongoose.model('patient', patientModel)