import { userGet } from "../services/auth";

const restrictToLoggedInUserOnly =(req:any,res:any,next:any)=>{
    const userId = req.cookies?.uid;

    if(!userId) return res.redirect('/login')
    
    const user = userGet(userId);
    if(!user) return res.redirect('/login')

    req.user = user;
    next()
}

export {restrictToLoggedInUserOnly}