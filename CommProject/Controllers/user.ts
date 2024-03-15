import express from 'express'
import fs from 'fs';
const allUserData = require('../Data/userData.json')


export const signupHandler=(req:express.Request,res:express.Response)=>{
    const { name,email,password }= req.body

    if(!name || !email || !password) return res.status(400).json({error:'enter data'})
    
    const userData= {
        name:name,
        email:email,
        password:password
    }

    allUserData.push(userData)
    fs.writeFile('./Data/userData.json',JSON.stringify(allUserData),()=>{
        return res.status(200);
    })
    return res.redirect('/')
};
// export const loginHandler=(req:express.Request,res:express.Response)=>{
//     const { email,password }= req.body

// }