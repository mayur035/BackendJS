"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StaticRoutes_1 = require("./Routes/StaticRoutes");
const path_1 = __importDefault(require("path"));
const taskRouter_1 = require("./Routes/taskRouter");
const RegisterRoutes_1 = require("./Routes/RegisterRoutes");
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./utils/passportConfig");
const express_session_1 = __importDefault(require("express-session"));
const port = 8000;
const app = (0, express_1.default)();
(0, passportConfig_1.initializingPassport)(passport_1.default);
//set engine for ejs
app.set('view engine', 'ejs');
app.set('views', path_1.default.resolve('./Views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', StaticRoutes_1.staticRouter);
app.use('/task', taskRouter_1.taskRouter);
app.use('/register', RegisterRoutes_1.registerRouter);
app.listen(port, () => {
    console.log(`Server listen on ${port}`);
});
