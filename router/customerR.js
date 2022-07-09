const bcryptjs = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const Customer = require("../model/customerM")
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
// const multer = require("multer");
// const upload = require("../fileupload/fileupload");
router.post("/customer/insert",(req,res)=>{
   
    const email = req.body.email;
    Customer.findOne({email:email})

    .then((cust_data)=>{
        if(cust_data!=null){
            res.join({msg:"Email already exists"});
            return;
        }

        const firstname = req.body.firstname;
        const password = req.body.password;
    
        const lastname = req.body.lastname;
        const username = req.body.username;
        
        const age = req.body.age;
        const email = req.body.email;

         //what is 10? maybe char length?

        bcryptjs.hash(password, 10, (e, hashed_pw)=>{
            const data = new Customer({
                firstname : firstname,
                lastname : lastname,
                username : username,
                password : hashed_pw,
                age : age,
                email : email
            })
            
        data.save()
        .then(()=>{
            res.json({success:true,msg: "Added"})
        })
        .catch((e)=>{res.json({e})})
        })
        
    })
    .catch()  
})

router.delete("/comment/delete",auth.customerGuard,(req,res)=>{
    res.json({message: "delete"})
})
router.post("/customer/login",(req,res)=>{
    const email = req.body.email;
    const password= req.body.password;

    Customer.findOne({email:email})
    .then((cust_data)=>{
        if(cust_data==null){
            res
            .status(404)
            .json({success:false, error:"Invalid Credential"})
            return;
        }
        bcryptjs.compare(password,cust_data.password,(e,result)=>{
            if(result == false){
                res
                .status(401)
                .json({success:false,error:"Invalid Credentials"})
                return;
            }
            ///now everything is valid..
            
            //console.log("valid");

            //creates token for the logged in user
            //the token stores login usersid

          const token=  jwt.sign({customerId:cust_data._id},"softwarica",{expiresIn:"1d"});
                //customerEmail:"cust_data._email"
            res.json({success:true,token: token});

        })
    })
    .catch()
})



//dashboard route for customer

router.get("/customer/dashboard",auth.customerGuard,(req,res)=>{
    console.log(req.customerInfo);
    // const data = {
    //     firstname: req.customerInfo.firstname,
    //     lastname : req.customerInfo.lastname,
    //     email: req.customerInfo.email,
    //     age: req.customerInfo.age,
    //     // password: req.customerInfo.password,
    //     username: req.customerInfo.username,
    // }

    // console.log(data);
    
    // res
    //     .json({success:true, data:data})
    res.json({firstname: req.customerInfo.firstname,lastname:req.customerInfo.lastname,email:req.customerInfo.email,age:req.customerInfo.age,username:req.customerInfo.username})
        
    
    

})

//dashboard update route
router.put("/customer/update",auth.customerGuard,(req,res)=>{
        const _id = req.customerInfo._id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;
        Customer.updateOne({_id:_id,
            firstname:firstname,
            lastname:lastname,
            username:username,
            email:email,
            age:age},
        )
        .then(()=>{
            res.json({message:"Updated", success:true})
        })
        .catch((e)=>{
            res.json({message:"something error"})
        })
})

// router.put("/customer/picupdates",auth.customerGuard,(req,res)=>{
    
//     console.log(req.file)
//     if(req.file==undefined){
//         return res.json({msg:"Invalid file format"})
//     }
//     Customer.updateOne({_id : req.customerInfo._id},{
//         customer_image: req.file.filename
//     })
//     .then()
//     .catch()
// })


module.exports = router;