const bcryptjs = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const Product = require("../model/productM")
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../fileupload/fileupload")


router.post("/product/insert",auth.customerGuard,upload.single("cust_img"),(req,res)=>{
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const qty = req.body.qty;
        const cust_img = req.file.filename;
        const userId = req.customerInfo._id;
               
        const data = new Product({
                name : name,
                price: price,
                description: description,
                qty: qty,
                cust_img: cust_img,
                userId : userId,
            })
            
        data.save()
        .then(()=>{
            res.json({msg: "Product Added"})
        })
        .catch((e)=>{res.json({e})})
        })
        

router.delete("/product/delete/:product_id",auth.customerGuard,(req,res)=>{
    Product.deleteOne({_id:req.params.product_id})
    .then(()=>{
        res.json({success:true,message: "delete"})
    })
    .catch((e)=>{
        res.json({success:false,message:"error"})
    })
})

router.put("/product/update/:product_id",(req,res)=>{
    const name= req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const qty= req.body.qty;
    // const cust_img = req.file.filename;

    Product.updateOne(
        {_id:req.params.product_id},
        {
            name:name,
            price:price,
            description:description,
            qty: qty,
            // cust_img:cust_img
        }
        )
        .then(()=>{
            res.json({msg:"Updated"})
        })
        .catch((e)=>{
            res.json({msg:"Error"})
        })
})

router.get("/product/display",auth.customerGuard,(req,res)=>{
    Product.find({userId:req.customerInfo._id})
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })

})

router.get("/product/single/:product_id",auth.customerGuard,(req,res)=>{
    Product.findOne({_id:req.params.product_id})
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})

module.exports = router;