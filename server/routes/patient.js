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


router.post('/add', (req, res) => {
    if (typeof req.body.fullName === 'undefined' ||typeof req.body.whichdoctor === 'undefined' || typeof req.body.nationalCode === 'undefined'||
    req.body.fullName.length ===0 ||req.body.whichdoctor.length ===0) {
        res.status(400).send({
            success: false,
            err: "اسم یا کدملی بیمار وارد نشده است یا موضوع مورد مراجعه ذکر نشده"
        })
    } else {
        if (Array.isArray(req.body.whichdoctor)) {
            console.log("is array");
        } else {
            req.body.whichdoctor = [req.body.whichdoctor]
        }



        if (typeof req.body.numberOfChildren === 'undefined' || req.body.numberOfChildren.length === 0) {
            patientServer.add(req.body.nationalCode, req.body.fullName, 0, req.body.whichdoctor, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        text: " بیمار اضافه شد"
                    })
                }
            })
        } else {
            patientServer.add(req.body.nationalCode, req.body.fullName, req.body.numberOfChildren, req.body.whichdoctor, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        text: " بیمار اضافه شد"
                    })
                }
            })

        }
    }
})
//nationalCoded,

router.get('/list', (req, res) => {
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
router.post('/deActive', (req, res) => {
    if (typeof req.body.id === 'undefined' || req.body.id.length === 0 || typeof req.body.turn === 'undefined' || req.body.turn.length === 0) {
        res.status(400).send({
            success: false,
            err: "missing id or turn"
        })
    } else {
        patientServer.deActive(req.body.id, req.body.turn, (errcode, text) => {
            if (errcode) {
                res.status(errcode).send({
                    success: false,
                    err: text
                })
            } else {
                res.status(200).send({
                    success: true,
                    text: text
                })
            }
        })
    }

})
router.post('/Active', (req, res) => {
    if (typeof req.body.id === 'undefined' || req.body.id.length === 0 || typeof req.body.turn === 'undefined' ||
        req.body.turn.length === 0) {
        res.status(400).send({
            success: false,
            err: "missing id or turn"
        })
    } else {
        patientServer.active(req.body.id, req.body.turn, (errcode, text) => {
            if (errcode) {
                res.status(errcode).send({
                    success: false,
                    err: text
                })
            } else {
                res.status(200).send({
                    success: true,
                    text: text
                })
            }
        })
    }

})
router.post('/edit', (req, res) => {
    if (typeof req.body.name === 'undefined', typeof req.body.numberOfChildren === 'undefined') {
        res.status(400).send({ err: "فیلد های مورد نظر را پر کنید" })
    } else {
        res.status(200).send({ text: "ok" })
    }
})
module.exports = router