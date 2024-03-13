import {Router} from 'express'

const staticRouter = Router();
const data = require('../model/data.json')


staticRouter.get('/',(req:any,res:any)=>{
    return res.render('home',{
        urls: data
    })
})

staticRouter.get('/signup',(req,res)=>{
    return res.render('signup')
})
staticRouter.get('/login',(req,res)=>{
    return res.render('login')
})
export {staticRouter}
