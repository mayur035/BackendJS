"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const user_1 = require("../Controllers/user");
const passport_1 = __importDefault(require("passport"));
exports.registerRouter = (0, express_1.Router)();
exports.registerRouter.post('/', user_1.signupHandler);
exports.registerRouter.post('/login', passport_1.default.authenticate("local", { failureRedirect: '/signup', successRedirect: '/' }));
