const bcryptjs = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const Admin = require("../model/adminM")
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

//register for admin
router.post("/admin/register",(req,res)=>{

})

//login for admin
router.post("/admin/login",(req,res)=>{
    console.log("working")
})

//update admin profile
router.put("/admin/update",auth.adminGuard,(req,res)=>{

})


module.exports = router;