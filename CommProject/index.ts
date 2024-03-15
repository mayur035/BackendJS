import express from "express";
import { staticRouter } from "./Routes/StaticRoutes";
import path from "path";
import { taskRouter } from "./Routes/taskRouter";
import { registerRouter } from "./Routes/RegisterRoutes";
import passport from 'passport'
import { initializingPassport } from "./utils/passportConfig";
import expressSession from 'express-session'

const port = 8000;
const app = express();

initializingPassport(passport)
//set engine for ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./Views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({secret:'secret',resave:false,saveUninitialized:false}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', staticRouter)
app.use('/task', taskRouter)
app.use('/register', registerRouter)

app.listen(port, () => {
    console.log(`Server listen on ${port}`);
})