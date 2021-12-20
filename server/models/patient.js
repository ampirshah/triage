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
        type: Number,
        unique:true
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
    let newturn = 1
    mongoose.model('patient', patientModel).findOne().sort({ $natural: -1 }).limit(1).exec((err, result) => {
        if (err) {
            console.log(err);
            return next(err)
        } else {
            if (result) {
                newturn = result.turn + 1
                console.log(newturn)
                patient.turn = newturn
                next()
            } else {
                patient.turn = newturn
                next();
            }
        }
    })

})

module.exports = mongoose.model('patient', patientModel)






// mongoose.model('patient', patientModel).find().exec((err, patients) => {
//     if (err) {
//         console.log(err);
//         return next(err)
//     } else {
//         newturn = patients.length + 1
//         if (patients[patients.length - 1].turn !==patients.length) {
//             console.log(patients[patients.length - 1].turn );
//             patient.turn = patients[patients.length - 1].turn + 1
//             next()
//         } else {
//             newturn = patients.length + 1
//             patient.turn = newturn
//             next()
//         }

//     }
// })