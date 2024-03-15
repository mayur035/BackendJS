import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv'

//import routes
import path from "path";
import { staticRouter } from "./router/static.routes";
import { signupRouter } from "./router/signup.routes";
import { urlRouter } from "./router/routes";
import { checkForAuthentication, restrictTo } from './middlewares/auth';
import { ROLE } from './constant';

const app = express();
dotenv.config();

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(checkForAuthentication)


//routes
app.use("/url",restrictTo([ROLE.Normal]), urlRouter)
app.use("/", staticRouter)
app.use('/signup', signupRouter)

app.listen(process.env.PORT, () => {
    console.log(`Port is sucessfully running on port ${process.env.PORT}`);
})