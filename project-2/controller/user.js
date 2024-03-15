"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInHandler = exports.signupHandler = void 0;
const usersData = require('../model/users-data.json');
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../services/auth");
const constant_1 = require("../constant");
const signupHandler = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.send({ status: constant_1.ERROR_MESSAGE._NotFound('Data') });
    const userData = {
        name: name,
        email: email,
        password: password
    };
    usersData.push(userData);
    fs_1.default.writeFile('./model/usersData.json', JSON.stringify(usersData), () => __awaiter(void 0, void 0, void 0, function* () {
        return yield res.redirect("/login");
    }));
};
exports.signupHandler = signupHandler;
const logInHandler = (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.send({ status: constant_1.ERROR_MESSAGE._NotFound('Data') });
    }
    // Find user by email
    const user = usersData.find((user) => user.email === email);
    // Check if user exists
    if (!user) {
        return res.send({ status: constant_1.ERROR_MESSAGE._NotFound(user) });
    }
    // Check if password matches
    if (user.password !== password) {
        return res.send({ status: constant_1.ERROR_MESSAGE._NotMatch('password') });
    }
    // userSet(sessionID,user)
    // res.cookie("uid",sessionID)
    //jwt stateless auth
    const token = (0, auth_1.userSet)(user);
    res.cookie('token', token);
    // Authentication successful, redirect to home page or wherever needed
    // return res.json({token});
    return res.redirect('/');
};
exports.logInHandler = logInHandler;
