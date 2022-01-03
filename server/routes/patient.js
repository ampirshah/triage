var express = require('express');
var router = express.Router();
let persianjs = require("persianjs");
let patientServer = require('../server/patient');

let privates = {
    verifyPhone: phone => {
        return /^[0][9][0-9]{9}$/.test(phone)
    },
    verifyNationalCode: nationalCoded => {
        return /^[0-9]{10}$/.test(nationalCoded)
    }
};


router.post('/addPatient', (req, res) => {
    if (req.body.fullName === undefined || req.body.whichdoctor === undefined || req.body.nationalCode=== undefined) {
        res.status(400).send({
            success: false,
            err: "اسم یا کدملی بیمار وارد نشده است یا موضوع مورد مراجعه ذکر نشده"
        })
    } else {
        req.body.whichdoctor = req.body.whichdoctor.split(',')
        console.log(typeof req.body.whichdoctor + ":" + req.body.whichdoctor);

        if (req.body.numberOfChildren === undefined || req.body.numberOfChildren.length === 0) {
            patientServer.add( req.body.nationalCode ,req.body.fullName , 0, req.body.whichdoctor, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        err: " بیمار اضافه شد"
                    })
                }
            })
        } else {
            patientServer.add( req.body.nationalCode,req.body.fullName, req.body.numberOfChildren, req.body.whichdoctor, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        err: " بیمار اضافه شد"
                    })
                }
            })

        }
    }
})
//nationalCoded,

router.post('/patientlist', (req, res) => {
    patientServer.list((errcode, errtext, data) => {
        if (errcode) {
            res.status(errcode).send({
                success: false,
                err: errtext
            })
        } else {
            res.status(200).send({
                success: true,
                patientList: data
            })
        }
    })
})

router.post('/editPatient')
module.exports = router