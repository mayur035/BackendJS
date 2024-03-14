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
const usersData = require('../model/usersData.json');
const fs_1 = __importDefault(require("fs"));
// import { v4 as uuidv4 } from 'uuid';
const auth_1 = require("../services/auth");
const signupHandler = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.send({ status: 'Enter data!' });
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
        return res.send({ status: 'Enter email and password!' });
    }
    // Find user by email
    const user = usersData.find((user) => user.email === email);
    // Check if user exists
    if (!user) {
        return res.send({ status: 'User not found!' });
    }
    // Check if password matches
    if (user.password !== password) {
        return res.send({ status: 'Incorrect password!' });
    }
    // const sessionID = uuidv4();
    // userSet(sessionID,user)
    // res.cookie("uid",sessionID)
    //jwt stateless auth
    const token = (0, auth_1.userSet)(user);
    // res.cookie('uid',token)
    // Authentication successful, redirect to home page or wherever needed
    return res.json({ token });
};
exports.logInHandler = logInHandler;
