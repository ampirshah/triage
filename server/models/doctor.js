const  mongoose  = require("mongoose");

schema = mongoose.Schema

doctorModel =new schema({
    phone: {
        type: String,
        unique: true
    },
    fullName :{
        type: String,   
    },
    specialty:{
        type: String,  
        required:true
    }
})


module.exports = mongoose.model('doctor',doctorModel)