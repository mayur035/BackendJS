"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const data_json_1 = __importDefault(require("../model/data.json"));
const constant_1 = require("../constant");
exports.staticRouter = (0, express_1.Router)();
exports.staticRouter.get('/', (0, auth_1.restrictTo)([constant_1.ROLE.Admin, constant_1.ROLE.Normal]), (req, res) => {
    return res.render('home', {
        urls: data_json_1.default
    });
});
exports.staticRouter.get('/admin/url', (0, auth_1.restrictTo)([constant_1.ROLE.Admin]), (req, res) => {
    return res.send("Admin only");
});
exports.staticRouter.get('/signup', (req, res) => {
    return res.render('signup');
});
exports.staticRouter.get('/login', (req, res) => {
    return res.render('login');
});
