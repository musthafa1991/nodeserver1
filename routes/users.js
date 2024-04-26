import express from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router=express.Router();

import { createUser, getUserByName } from "../helper.js";

const genPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);
    return hashPassword;
    }

router.post("/signup",async(req,res)=>{
const{name,password}=req.body;
const hashedPassword=await genPassword(password);
let userData={name,password:hashedPassword}
let result=await createUser(userData)
res.send(result)
})

router.post("/login",async(req,res)=>{
    const{name,password}=req.body;
    const userFromDB=await getUserByName(name)
    console.log("user",userFromDB);
    if(!userFromDB){
        res.status(401).send({message:"Invalid credentials"})
    }else{
        const storedPassword=userFromDB.password;
        const isMatch=await bcrypt.compare(password,storedPassword)
        console.log("isMatch",isMatch);
        if (isMatch) {
            const token=jwt.sign({id:userFromDB._id},process.env.SECRETKEY)
            res.status(200).send({message:"Succussfully Login",token:token})

        } else {
            res.status(401).send({message:"Invalid credentials"})
        }
       
    }
    })
export const userRouter=router;


   
    
    