import {Router} from 'express'
const taskList = require('../Data/taskList.json')

const staticRouter = Router();

staticRouter.get('/',(req:any,res:any)=>{
    return res.render('form',{
        __taskData:taskList,
    });
})
staticRouter.get('/login',(req:any,res:any)=>{
    return res.render('login');
})
staticRouter.get('/signup',(req:any,res:any)=>{
    return res.render('signup');
})

export {staticRouter}