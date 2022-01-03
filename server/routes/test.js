var express = require('express');
var router = express.Router();
let persianjs = require("persianjs");
const patientModel = require("../models/patient");

const doctorModel = require('../models/doctor');
const { log } = require('../server/doctor');
router.get('/test', (req, res) => {
    doctorModel.find().exec((err, users) => {
        if (err) {
            res.status(500).json(err)

        } else {
            let ids = []
            var len = users.length
            console.log(len);
            console.log(users);
            users.forEach(element => {
                ids.push(element._id)
            });
            res.status(200).json({ users: users, ids: ids })
        }
    })

})

router.get('/addtest', (req, res) => {
    req.body.fullName
    req.body.whichdoctor
    // array = req.body.whichdoctor.split(',')

    if (Array.isArray(req.body.whichdoctor)) {
        console.log("is array");
    } else {
        req.body.whichdoctor = [req.body.whichdoctor]
    }

    result = Array.isArray(req.body.whichdoctor)
    console.log(typeof req.body.whichdoctor);

    // "_id": { $in: req.body.whichdoctor }
    doctorModel.find({"id": { $in: req.body.whichdoctor }, 'active':false}).exec((err, doctors) => {
        if (err) {
            res.status(500).json({ err: err })
        } else {
            res.status(200).json({ isArray: result, a: req.body.whichdoctor, doctor: doctors })
        }
    })


    console.log(result);


    // doctorModel.find({ specialty: { $in: array } }, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(user);
    //         for (let index in user) {
    //             newpatient.needTobeVisitBy.push({ doctor: user[index] })
    //         }


    //         newpatient.save((err, result) => {
    //             if (err) {

    //                 console.log(err);
    //                 res.status(500).json({ error: err })
    //             } else {
    //                 console.log(result);
    //                 res.status(200).json({ isArrat: result, array: array, querry: result })
    //             }
    //         })
    //     }
    // })




})

router.get('/find', (req, res) => {
    patientModel.find({ 'needTobeVisitBy.doctor': '61b4a043ef5e43e7e4a3000e' }, (err, result) => {
        if (err) {
            res.status(500).json({ err: err })
        }
        else {
            res.status(200).json({ finded: result })
        }
    })
})

router.get('/find1', (req, res) => {
    patientModel.find().sort({ $natural: -1 }).limit(1).exec((err, result) => {
        if (err) {
            res.status(500).json({ err: err })
        }
        else {
            res.status(200).json({ finded: result })
        }
    })
})


module.exports = router