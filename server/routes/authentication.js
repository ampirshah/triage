let jwt = require('jsonwebtoken');
let secretKey = "doc"
const doctorModel = require("../models/doctor");
methods = []
var express = require('express');
var router = express.Router();




///
methods.authentication =()=> (req, res, next) => {
    
    if (typeof req.headers.token === 'undefined') {
        res.status(403).send({
            "error": "unautherized"
        });
    } else {
        let token = req.headers.token
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                res.status(403).send({
                    "error": "unautherized"
                });
            } else {
                doctorModel.findOne({ _id: decode.id }).exec((err, doctor) => {
                    if (err) {
                        res.status(500).send({
                            error: err
                        })
                    }else if (!doctor) {
                        res.res.status(403).send({
                            "error": "unautherized"
                        });
                    } else {
                        req.doctor=doctor
                        next();
                    }
                })
            }
        })
    }
}

module.exports=methods

// router.post('/auth',(req,res)=>{
//     if (typeof req.headers.token === 'undefined') {
//         res.res.status(403).send({
//             "error": "unautherized"
//         });
//     } else {
//         let token = req.headers.token
//         jwt.verify(token, secretKey, (err, decode) => {
//             if (err) {
//                 res.res.status(403).send({
//                     "error": "unautherized"
//                 });
//             } else {
//                 doctorModel.findOne({ _id: decode.id }).exec((err, doctor) => {
//                     if (err) {
//                         res.status(500).send({
//                             error: err
//                         })
//                     } else {
//                         res.status(200).send({ doctor: doctor ,
//                         decode:decode })
//                     }
//                 })
//             }
//         })
//     }
// })