"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticRouter = void 0;
const express_1 = require("express");
const staticRouter = (0, express_1.Router)();
exports.staticRouter = staticRouter;
const data = require('../model/data.json');
staticRouter.get('/', (req, res) => {
    return res.render('home', {
        urls: data
    });
});
staticRouter.get('/signup', (req, res) => {
    return res.render('signup');
});
staticRouter.get('/login', (req, res) => {
    return res.render('login');
});
