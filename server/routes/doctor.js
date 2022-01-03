const { log } = require('debug');
var express = require('express');
var router = express.Router();
let persianjs = require("persianjs");
const doctor = require('../models/doctor');
let doctorService = require('../server/doctor');
const pass = require('../passwords/password');
let privates = {
    verifyPhone: phone => {
        return /^[0][9][0-9]{9}$/.test(phone)
    }
};

router.post('/add', (req, res) => {

    if (typeof req.body.phoneNumber === 'undefined' || typeof req.body.fullName === "undefined" || typeof req.body.specialty === "undefined"
        || req.body.phoneNumber.length === 0 || req.body.phoneNumber.length === 0 || req.body.specialty.length === 0) {
        res.status(400).send({
            success: false,
            error: "لطفا فیلد های مورد نظر را صحیح  وکامل پر کنید",
            text: " اسم باید از 5 کلمه بیشتر باشد و شماره 11 رقم و با 09 شروع شود"
        })
    }
    else {
        console.log(req.body.phoneNumber + " : " + req.body.fullName + " : " + req.body.specialty);

        console.log(req.body.phoneNumber + typeof req.body.phoneNumber);
        req.body.phoneNumber = persianjs(req.body.phoneNumber).toEnglishNumber().toString();
        console.log(req.body.phoneNumber + typeof req.body.phoneNumber);
        if (privates.verifyPhone(req.body.phoneNumber)) {

            doctorService.add(req.body.phoneNumber, req.body.fullName, req.body.specialty, (errcode, errtext, ifexist) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext,
                        ifExist: ifexist
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        text: " دکتر جدید اضافه شد"
                    })
                }
            })
        } else {
            res.status(400).send({
                success: false,
                error: "شماره وارد شده اشتباه است"
            });
        }
    }
})


router.post('/login', (req, res) => {
    if (typeof req.body.phoneNumber === 'undefined' || req.body.phoneNumber.length === 0) {
        res.status(400).send({
            success: false,
            error: "لطفا فیلد  مورد نظر را صحیح  وکامل پر کنید",
            text: "  شماره 11 رقم و با 09 شروع شود"
        })
    } else {
        if (privates.verifyPhone(req.body.phoneNumber)) {
            doctorService.login(req.body.phoneNumber, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        error: errtext
                    })
                } else {
                    if (typeof req.body.password === "undefined" || req.body.password.length === 0) {
                        res.status(400).send({
                            success: false,
                            error: "رمز را وارد نکردید"
                        });
                    } else {
                        if (pass === req.body.password) {
                            res.status(200).send({
                                success: true,
                                text: "شماره وارد شده صحیح است"
                            })
                        } else {
                            res.status(400).send({
                                success: false,
                                error: "رمز وارد شده صحیح نیست"
                            });
                        }
                    }

                }
            })
        } else {
            res.status(400).send({
                success: false,
                error: "شماره وارد شده اشتباه است"
            });
        }
    }
})

router.post('/edit', (req, res) => {

    if ((typeof req.body.id === "undefined" || typeof req.body.newPhoneNumber === "undefined" || typeof req.body.newName === " undefined" ||
        typeof req.body.newspecilty === "undefined") ||
        (req.body.id.length === 0 || req.body.newPhoneNumber.length === 0 ||
            req.body.newName.length === 0 || req.body.newspecilty.length === 0)) {
        res.status(400).send({
            success: false,
            error: "اطلاعات را کامل وارد کنید",
        })
    } else {
        doctorService.edit(req.body.id, req.body.newPhoneNumber, req.body.newName, req.body.newspecilty,
            (errcode, errtext, newrecord) => {
            if (errcode) {
                res.status(errcode).send({
                    success: false,
                    error: errtext
                })
            } else {
                res.status(200).send({
                    success: true,
                    doctor: newrecord
                })
            }
        })
    }
})


router.get('/list', (req, res) => {
    doctorService.list((errcode, errtext, data) => {
        if (errcode) {
            res.status(errcode).send({
                err: errtext
            })
        } else {
            res.status(200).send({
                doctorlist: data
            })
        }
    })
})

router.post('/deactive', (req, res) => {
    if (typeof req.body.phoneNumber === "undefined" || req.body.phoneNumber.length === 0) {
        res.status(400).send({
            success: false,
            error: "لطفا فیلد  مورد نظر را صحیح  وکامل پر کنید",
            text: "  شماره 11 رقم و با 09 شروع شود"
        })
    } else {
        if (privates.verifyPhone(req.body.phoneNumber)) {
            doctorService.deactive(req.body.phoneNumber, (errcode, errtext, data) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        doctor: data
                    })
                }
            })
        } else {
            res.status(400).send({
                success: false,
                error: "شماره وارد شده اشتباه است"
            });
        }

    }

})

router.post('/active', (req, res) => {
    if (typeof req.body.phoneNumber === "undefined" || req.body.phoneNumber.length === 0) {
        res.status(400).send({
            success: false,
            error: "لطفا فیلد  مورد نظر را صحیح  وکامل پر کنید",
            text: "  شماره 11 رقم و با 09 شروع شود"
        })
    } else {
        if (privates.verifyPhone(req.body.phoneNumber)) {
            doctorService.active(req.body.phoneNumber, (errcode, errtext, data) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        doctor: data
                    })
                }
            })
        } else {
            res.status(400).send({
                success: false,
                error: "شماره وارد شده اشتباه است"
            });
        }

    }

})

router.get('/patientList', (req, res) => {
    if (typeof req.body.id === "undefined" || req.body.id.length === 0) {
        res.status(400).send({
            success: false,
            error: "missing id"
        });
    } else {
        doctorService.patientList(req.body.id, (errcode, errtext, patients) => {
            if (errcode) {
                res.status(errcode).send({
                    success: false,
                    err: errtext
                })
            } else {
                res.status(200).send({
                    success: true,
                    list: patients
                })
            }
        })
    }
})

router.post('/callForPatient', (req, res) => {
    if (typeof req.body.id === "undefined" || req.body.id.length === 0) {
        res.status(400).send({
            success: false,
            error: "missing id"
        });
    } else {
        doctorService.callForPatient(req.body.id, (errcode, errtext, patients) => {
            if (errcode) {
                res.status(errcode).send({
                    success: false,
                    err: errtext
                })
            } else {
                res.status(200).send({
                    success: true,
                    nextPatient: patients[0]
                })
            }
        })
    }
})

router.post('/patiententer', (req, res) => {
    if (typeof req.body.turn === 'undefined' || typeof req.body.id === 'undefined') {
        res.status(400).send({
            success: false,
            err: 'فیلد های مورد نظر را بفرستید'
        })
    } else {
        doctorService.patiententer(req.body.id, req.body.turn, (errorcode, errortext, patient) => {
            if (errorcode) {
                res.status(errorcode).send({
                    success: false,
                    err: errortext
                })
            } else {
                res.status(200).send({
                    success: true,
                    update: patient
                })
            }
        })
    }

})

router.post('/patientexit', (req, res) => {
    if (typeof req.body.turn === 'undefined' || typeof req.body.id === 'undefined') {
        res.status(400).send({
            success: false,
            err: 'فیلد های مورد نظر را بفرستید'
        })
    } else {
        doctorService.patiententer(req.body.id, req.body.turn, (errorcode, errortext, patient) => {
            if (errorcode) {
                res.status(errorcode).send({
                    success: false,
                    err: errortext
                })
            } else {
                res.status(200).send({
                    success: true,
                    update: patient
                })
            }
        })
    }

})
module.exports = router