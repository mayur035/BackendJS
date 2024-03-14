import { userGet } from "../services/auth";

const checkForAuthentication =(req:any,res:any,next:any)=>{
    req.user = null;
    const authorizationValue = req.headers['authorization'];
    if(!authorizationValue || !authorizationValue.startsWith('Bearer')){
        return next();
    }
    const token = authorizationValue.split('Bearer ')[1];
    const user = userGet(token);
    req.user = user 
    return next();
}

// const restrictToLoggedInUserOnly = (req: any, res: any, next: any) => {
//     // const userId = req.cookies?.uid;
//     const userId = req.headers['authorization'];
//     if (!userId) return res.redirect('/login')

//     const token = userId.split("Bearer ")[1]
//     const user: any = userGet(token);
//     if (!user) return res.redirect('/login')
//     req.user = user;
//     next()
// }

// const checkAuth = (req: any, res: any, next: any) => {
//     const userId = req.headers['authorization'];    
//     const token = userId?.split("Bearer ")[1]

//     const user = userGet(token);
//     req.user = user;
//     next();
// }

export {
   checkForAuthentication
}