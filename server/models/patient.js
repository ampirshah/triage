const mongoose = require('mongoose')
const schema = mongoose.Schema

let patientModel = new schema({
    nationalCode: {
        type: String,

    },
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
        status: {
            type: String,
            enum: ["0", "1", "2"],
            default: "0"
        }
    }],
    active: {
        type: Boolean,
        default: true
    }
});


patientModel.pre('save', function (next) {
    let patient = this;
    mongoose.model('patient', patientModel).find().exec((err, patients) => {
        if (err) {
            console.log(err);
            return next(err)
        } else {   
            newturn = patients.length + 1
            if (patients[patients.length - 1].turn !==patients.length) {
                console.log(patients[patients.length - 1].turn );
                patient.turn = patients[patients.length - 1].turn + 1
                next()
            } else {
                newturn = patients.length + 1
                patient.turn = newturn
                next()
            }

        }
    })
})

module.exports = mongoose.model('patient', patientModel)