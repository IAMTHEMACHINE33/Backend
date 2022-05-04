const jwt = require("jsonwebtoken");
const customer = require("../model/customerM")


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