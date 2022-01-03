var express = require('express');
var router = express.Router();
let persianjs = require("persianjs");
const patientModel = require("../models/patient");
const doctorModel = require('../models/doctor');
const { log } = require('../server/doctor');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

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
    req.body.whichdoctor = req.body.whichdoctor.map(s => mongoose.Types.ObjectId(s));
    result = Array.isArray(req.body.whichdoctor)
    console.log(typeof req.body.whichdoctor);

    // "_id": { $in: req.body.whichdoctor }
    doctorModel.find({ "_id": { $match: req.body.whichdoctor } }).exec((err, doctors) => {
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
    patientModel.find({ 'needTobeVisitBy.doctor': ObjectId('61b4a043ef5e43e7e4a3000e') }).sort({ turn: 1 })
        .exec((err, result) => {
            if (err) {
                res.status(500).json({ err: err })
            }
            else {
                // console.log("len avaliyee::"+result.length);
                // console.log("typeof:" + Array.isArray(result);
                index = result.map((javab, index) => {
                    let condition
                    for (let i of javab.needTobeVisitBy) {
                        // console.log(index);
                        // console.log(i.status);
                        // if(i.status==="2" || i.status==="1") ghalte    
                        //soal?????
                        /// Object('61b4a043ef5e43e7e4a3000e')
                        // console.log("typeof::" + typeof i.doctor);

                        if ((i.doctor == '61b4a043ef5e43e7e4a3000e' && i.status === "0")) {
                            // console.log("heelloo from if");
                            // console.log(index);
                            return index
                        }
                    }
                })
                console.log("return:" + index)
                // console.log( typeof index)
                let numberOfRemove = []
                index.map((i) => {
                    if (i !== undefined) {
                        // console.log(i);
                        // deleteindex = i - numberOfRemove
                        // console.log("most be delete:" + (i - numberOfRemove) + "  len:" + result.length)
                        // result.splice((i - numberOfRemove), 1)
                        // numberOfRemove = numberOfRemove + 1
                        // console.log("check the action" + numberOfRemove);
                        numberOfRemove.push(result[i])
                        console.log("new result" + numberOfRemove);
                    }
                })
                result = numberOfRemove

                res.status(200).json({ finded: result })
            }
        })
})

// javab.needTobeVisitBy.map((innerjavab) => {
//     console.log(innerjavab);
//     if (javab.doctor === '61b4a043ef5e43e7e4a3000e') {
//         console.log("in"+index+":"+javab);
//         // if (innerjavab.status == 2) {
//         //    console.log(innerjavab);
//         // }
//     }
// })

// index.map((i)=>{
//     console.log("I:"+i);
//     // console.log("map::"+i);
//     let removeNumber=0
//     if(i!==undefined){
//         console.log("befor_delte:"+result.length)
//         console.log("heelloo from if")
//         // console.log(result[i-removeNumber]);
//         console.log("most be delte"+i-removeNumber);
//         result.splice(i-removeNumber,1)
//         console.log("after_delte:"+result.length)
//         removeNumber++

//     }
// })
//.sort({ $natural: -1 }).limit(1)


/// soall
///, needTobeVisitBy:{doctor:'61b4a043ef5e43e7e4a3000e' status:"0" }
router.get('/enterdfind', (req, res) => {
    patientModel.findOne({ turn: req.body.turn }).exec((err, patients) => {
        if (err) {
            res.status(500).json({ err: err })
        } else {
            if (patients) {
                let condition = false;
                for (i in patients.needTobeVisitBy) {
                    if (patients.needTobeVisitBy[i].doctor == req.body.id && patients.needTobeVisitBy[i].status === "0") {
                        console.log(i);
                        patients.needTobeVisitBy[i].status = "1";
                        console.log(patients.needTobeVisitBy[i].status);
                        condition = true
                        break;
                    }
                }
                if (condition) {
                    patientModel.findOneAndUpdate({ turn: req.body.turn }, { active: true, needTobeVisitBy: patients.needTobeVisitBy })
                    .exec((err, patient) => {
                        if (err) {
                            res.status(500).json({ err: err })
                        } else {
                            res.status(200).json({ finded: patient })
                        }
                    })
                } else {
                    res.status(400).json({ err: "The patient is visited or No need to visit" })
                }
            } else {
                res.status(400).json({ err: "user not found" })
            }
        }
    })
})


router.get('/exitfind', (req, res) => {
    patientModel.findOne({ turn: req.body.turn, 'needTobeVisitBy.status': '1' }).exec((err, patients) => {
        if (err) {
            res.status(500).json({ err: err })
        } else {
            if (patients) {
                // console.log(result);
                let condition = false;
                for (i in patients.needTobeVisitBy) {
                    console.log(i);
                    if (patients.needTobeVisitBy[i].doctor == req.body.id && patients.needTobeVisitBy[i].status === "1") {
                        console.log("hello from if");
                        patients.needTobeVisitBy[i].status = "2";
                        console.log(patients.needTobeVisitBy[i].status);
                        condition = true
                        break;
                    }
                }
                if (condition) {
                    patientModel.findOneAndUpdate({ turn: req.body.turn }, { needTobeVisitBy: patients.needTobeVisitBy })
                        .exec((err, patient) => {
                            if (err) {
                                res.status(500).json({ err: err })
                            } else {
                                res.status(200).json({ finded: patient })
                            }
                        })
                } else {
                    res.status(400).json({ err: "The patient is in the presence of another doctor" })
                }

            } else {
                res.status(400).json({ err: "user not found or patient dosent enter " })
            }
        }
    })
})


router.get('/find1', (req, res) => {
    patientModel.find({ 'needTobeVisitBy.doctor': ObjectId(req.body.id), 'needTobeVisitBy.status': { $ne: '1' } }).sort({ turn: 1 })
        .exec((err, result) => {
            if (err) {
                res.status(500).json({ err: err })
            }
            else {
                let index = result.map((javab, index) => {
                    let condition
                    for (let i of javab.needTobeVisitBy) {
                        if ((i.doctor == req.body.id && i.status === "0")) {
                            return index
                        }
                    }
                })
                console.log(index);
                let patients = []
                index.map((javab) => {
                    if (typeof javab !== 'undefined') {
                        console.log(javab);
                        patients.push(result[javab])
                    }
                })

                res.status(200).json({ finded: patients })

            }
        })
})

module.exports = router




// router.get('/find1', (req, res) => {
//     let condition=  [{doctor:req.body.id , status:'0'}]
//     patientModel.find({'needTobeVisitBy.status':{ $ne: '1' }, needTobeVisitBy:{$in : condition} })
//     .exec((err, result) => {
//         if (err) {
//             res.status(500).json({ err: err })
//         }
//         else {
//             res.status(200).json({ finded: result })
//         }
//     })
// })