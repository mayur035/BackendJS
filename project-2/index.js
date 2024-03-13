"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 8000;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//import routes
const path_1 = __importDefault(require("path"));
const staticRoutes_1 = require("./router/staticRoutes");
const signup_1 = require("./router/signup");
const routes_1 = require("./router/routes");
const auth_1 = require("./middlewares/auth");
app.set('view engine', 'ejs');
app.set('views', path_1.default.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use((0, cookie_parser_1.default)());
//routes
app.use("/url", auth_1.restrictToLoggedInUserOnly, routes_1.urlRouter);
app.use("/", staticRoutes_1.staticRouter);
app.use('/signup', signup_1.signupRouter);
app.listen(port, () => {
    console.log(`Port is sucessfully running on port ${port}`);
});
