"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.checkForAuthentication = void 0;
const auth_1 = require("../services/auth");
const checkForAuthentication = (req, res, next) => {
    var _a;
    //get token from cookie storage
    const tokenCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    req.user = null;
    // const authorizationValue = req.headers['authorization'];
    const user = (0, auth_1.userGet)(tokenCookie);
    req.user = user;
    return next();
};
exports.checkForAuthentication = checkForAuthentication;
//Authorization--restrict some user for get some functionality
const restrictTo = (roles = []) => {
    return function (req, res, next) {
        console.log("req.user", req.user);
        if (!req.user)
            return res.redirect('/login');
        const user = req.user; // Type assertion
        if (!user)
            return res.redirect('/login');
        if (!roles.includes(user.role))
            return res.end('UnAuth');
        return next();
    };
};
exports.restrictTo = restrictTo;
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
