const doctor = require("../models/doctor");
const doctorModel = require("../models/doctor");
const patientModel = require("../models/patient");
var ObjectId = require('mongodb').ObjectId;
let methods = {};

methods.add = function (phoneNumber, fullName, specialty, callback) {
    doctorModel.findOne({ phone: phoneNumber }).lean().exec((err, doctor) => {
        // doctorModel.findOne({ phone: phoneNumber }, (err, doctor) => {

        if (err) {
            console.log(err);
            callback(500, err, false)
        } else {
            //age doctor bood
            if (doctor) {
                console.log("این شماره قبلا ثبت شده");
                callback(401, "کاربر تکراری است!", true);
            }
            else {
                let newdoctor = new doctorModel({
                    phone: phoneNumber,
                    fullName: fullName,
                    specialty: specialty
                })
                newdoctor.save((err) => {
                    if (err) {
                        callback(500, err, false)
                    } else {
                        console.log("new doc added");
                        callback(null, null, false)
                    }
                })
            }
        }
    })

};

methods.login = function (phoneNumber, callback) {
    doctorModel.findOne({ phone: phoneNumber }).lean().exec((err, doctor) => {
        if (err) {
            this.console.log(err);
            callback(500, err)
        } else {
            if (doctor) {
                callback(null, null)
            } else {
                callback(400, "شماره وارد شده در سیستم ثبت نشده ")
            }
        }
    })
}
methods.list = function (callback) {
    doctorModel.find().lean().exec((err, doctors) => {
        if (err) {
            callback(500, err, null)
        } else {
            callback(null, null, doctors)
        }
    })

}

methods.deactive = function (phone, callback) {
    doctorModel.findOneAndUpdate({ phone: phone }, { active: false }).lean().exec((err, doctor) => {
        if (err) {
            callback(500, err)
        } else {
            if (doctor) {
                callback(null, null, doctor)
            } else {
                callback(400, "دکتر مورد نظر پیدا نشد ", doctor)
            }

        }
    })
}

methods.active = function (phone, callback) {
    doctorModel.findOneAndUpdate({ phone: phone }, { active: true }).lean().exec((err, doctor) => {
        if (err) {
            callback(500, err)
        } else {
            if (doctor) {
                callback(null, null, doctor)
            } else {
                callback(400, "دکتر مورد نظر پیدا نشد ", doctor)
            }

        }
    })
}

methods.edit = function (id, newPhone, newName, newSpecialty, callback) {
    doctorModel.findOneAndUpdate({ _id: id }, { phone: newPhone, fullName: newName, specialty: newSpecialty }).lean().exec(
        (err, updated) => {
            if (err) {
                callback(500, err)
            } else {
                if (updated) {
                    callback(null, null, updated)
                } else {
                    callback(400, "id not found")
                }
            }
        })

}


methods.patientList = function (id, callback) {
    patientModel.find({ 'needTobeVisitBy.doctor': ObjectId(id), active:true }).lean().exec((err, result) => {
        if (err) {
            callback(500, err, null)
        }
        else {
            index = result.map((javab, index) => {
                for (let i of javab.needTobeVisitBy) {
                    console.log("typeof::" + typeof i.doctor);
                    if ((i.doctor == id && i.status === "2") || i.status === "1") {
                        return index
                    }
                }
            })

            console.log("return:" + index)
            let numberOfRemove = 0

            index.map((i) => {
                console.log();
                if (i !== undefined) {
                    console.log(i);
                    deleteindex = i - numberOfRemove
                    console.log("most be delete:" + (i - numberOfRemove) + "  len:" + result.length)
                    result.splice((i - numberOfRemove), 1)
                    numberOfRemove = numberOfRemove + 1
                    console.log("check the action" + numberOfRemove);
                }

            })

            callback(null, null, result)
        }
    })
}


// if (err) {
//     callback(500, err, null)
// }
// else {
//     callback(null, null, result)
// }


methods.patientEnterd = function (turn, callback) {
    
}

module.exports = methods