const jwt = require("jsonwebtoken");
const customer = require("../model/customerM")
const admin = require("../model/adminM")

//guard for customer

module.exports.customerGuard=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "softwarica");
        console.log(data);
        customer.findOne({_id:data.customerId})
        .then((cdata)=>{
            req.customerInfo = cdata;
            next();
        })
        .catch((e)=>{
            res.json({message: "invalid token"})
        })
        


    }
    catch(e){
        res.json({message:"invalid token"})
    }
} 

//guard for admin
module.exports.adminGuard=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "softwarica");
        console.log(data);
        admin.findOne({_id:data.adminId})
        .then((cdata)=>{
            req.adminInfo = cdata;
            next();
        })
        .catch((e)=>{
            res.json({message: "invalid token"})
        })
        


    }
    catch(e){
        res.json({message:"invalid token"})
    }
}