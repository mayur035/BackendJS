"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticRouter = void 0;
const express_1 = require("express");
const taskList = require('../Data/taskList.json');
const staticRouter = (0, express_1.Router)();
exports.staticRouter = staticRouter;
staticRouter.get('/', (req, res) => {
    return res.render('form', {
        __taskData: taskList,
    });
});
staticRouter.get('/login', (req, res) => {
    return res.render('login');
});
staticRouter.get('/signup', (req, res) => {
    return res.render('signup');
});
