const patientModel = require("../models/patient");
const doctor = require("../models/doctor");
let methods = {};

methods.add = function (nationalCode,fullName, childs, whichdoctor, callback) {
    let newpatient = new patientModel({
        nationalCode:nationalCode,
        fullName: fullName,
        numberOfChildren: childs
    })

    //{ specialty:{$match: whichdoctor}nationalCoded:nationalCoded,

    doctor.find({ specialty: { $in: whichdoctor } }, (err, doctor) => {
        if (err) {
            console.log(err);
        } else {
            if (doctor) {
                console.log("doctoooooor::::::");
                console.log("founded doc" + ":" + doctor);
                for (let i in doctor) {
                    console.log(i);
                    newpatient.needTobeVisitBy.push({ doctor: doctor[i]._id })
                }

                newpatient.save((err, result) => {
                    if (err) {

                        console.log(err);
                        callback(500, err)
                    } else {
                        console.log("newpatient" + ":" + result);
                        callback(null, null)
                    }
                })
            } else {
                console.log("doctori nbood");
                callback(400, "doctor mored nazar peyda nashod")
            }
        }
    })

}

methods.list = function (callback) {

    patientModel.find({ active: true }).populate({ path: 'needTobeVisitBy.doctor', select: ['fullName', 'specialty'] }).exec((err, doctors) => {
        if (err) {
            console.log("hello from error");
            callback(500, err, null)
        } else {
            callback(null, null, doctors)
        }
    })

}


module.exports = methods









// patientModel.find((err, doctors) => {
    //     if (err) {
    //         callback(500, err, null)
    //     } else {
    //         callback(null, null, doctors)
    //     }
    // })'needTobeVisitBy.doctor''fullName''specialty'