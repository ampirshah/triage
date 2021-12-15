const doctor = require("../models/doctor");
const doctorModel = require("../models/doctor");

let methods = {};

methods.add = function (phoneNumber, fullName, specialty, callback) {
    doctorModel.findOne({ phone: phoneNumber }).lean().exec((err, doctor) => {
    // doctorModel.findOne({ phone: phoneNumber }, (err, doctor) => {

        if (err) {
            console.log(err);
            callback(500, err,false)
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
                        callback(500, err,false)
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
    doctorModel.findOne({ phone: phoneNumber }, (err, doctor) => {
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
    doctorModel.find({ active: true }, (err, doctors) => {
        if (err) {
            callback(500, err, null)
        } else {
            callback(null, null, doctors)
        }
    })

}

methods.del = function (phone, callback) {
    doctorModel.findOneAndUpdate({ phone: phone }, { active: false }, (err, doctor) => {
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
    doctorModel.findOneAndUpdate({ _id: id }, { phone: newPhone, fullName: newName, specialty: newSpecialty },
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
module.exports = methods