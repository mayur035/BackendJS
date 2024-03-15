import { JwtPayload } from "jsonwebtoken";
import { userGet } from "../services/auth";
import express from 'express';
interface User {
    email: string;
    password: string;
    role: string;
}
interface AuthenticatedRequest extends express.Request {
    user?: User | null | string | JwtPayload;
}
export const checkForAuthentication = (req: AuthenticatedRequest, res: express.Response, next: any) => {
    
    //get token from cookie storage
    const tokenCookie = req.cookies?.token;
    req.user = null;

    // const authorizationValue = req.headers['authorization'];
    const user = userGet(tokenCookie);
    req.user = user
    return next();
}

//Authorization--restrict some user for get some functionality
export const restrictTo=(roles: string[] = [])=> {
    return function (req: AuthenticatedRequest, res: express.Response, next: any) {
        console.log("req.user", req.user);

        if (!req.user) return res.redirect('/login');

        const user = req.user as User | null; // Type assertion

        if (!user) return res.redirect('/login');
        if (!roles.includes(user.role)) return res.end('UnAuth');
        return next();
    }
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

