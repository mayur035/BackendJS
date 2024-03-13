"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controller/user");
const signupRouter = (0, express_1.Router)();
exports.signupRouter = signupRouter;
signupRouter.post('/', user_1.signupHandler);
signupRouter.post('/login', user_1.logInHandler);
