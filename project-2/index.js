"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//import routes
const path_1 = __importDefault(require("path"));
const static_routes_1 = require("./router/static.routes");
const signup_routes_1 = require("./router/signup.routes");
const routes_1 = require("./router/routes");
const auth_1 = require("./middlewares/auth");
const constant_1 = require("./constant");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set('view engine', 'ejs');
app.set('views', path_1.default.resolve('./views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(auth_1.checkForAuthentication);
//routes
app.use("/url", (0, auth_1.restrictTo)([constant_1.ROLE.Normal]), routes_1.urlRouter);
app.use("/", static_routes_1.staticRouter);
app.use('/signup', signup_routes_1.signupRouter);
app.listen(process.env.PORT, () => {
    console.log(`Port is sucessfully running on port ${process.env.PORT}`);
});
