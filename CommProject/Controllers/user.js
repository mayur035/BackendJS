"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const allUserData = require('../Data/userData.json');
const signupHandler = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'enter data' });
    const userData = {
        name: name,
        email: email,
        password: password
    };
    allUserData.push(userData);
    fs_1.default.writeFile('./Data/userData.json', JSON.stringify(allUserData), () => {
        return res.status(200);
    });
    return res.redirect('/');
};
exports.signupHandler = signupHandler;
// export const loginHandler=(req:express.Request,res:express.Response)=>{
//     const { email,password }= req.body
// }
