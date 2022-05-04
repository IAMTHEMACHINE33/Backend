const bcryptjs = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const Customer = require("../model/customerM")
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

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
        .then()
        .catch()
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
            res.json({msg:"Invalid Credential"})
            return;
        }
        bcryptjs.compare(password,cust_data.password,(e,result)=>{
            if(result == false){
                res.json({msg:"Invalid Credentials"})
                return;
            }
            ///now everything is valid..
            
            //console.log("valid");

            //creates token for the logged in user
            //the token stores login usersid

          const token=  jwt.sign({customerId:"cust_data_id"},"softwarica");
                //customerEmail:"cust_data._email"
            res.json({token: token});

        })
    })
})




module.exports = router;