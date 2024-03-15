"use strict";
//statefull auth
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSet = exports.userGet = void 0;
//using jwt token -- stateless auth
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serectKey = 'anySecretkey@1';
const userSet = (user) => {
    return jsonwebtoken_1.default.sign(user, serectKey);
};
exports.userSet = userSet;
const userGet = (token) => {
    if (!token)
        return null;
    try {
        return jsonwebtoken_1.default.verify(token, serectKey);
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
exports.userGet = userGet;
