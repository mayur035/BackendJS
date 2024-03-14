const express = require('express')
const app = express();
const port = 8000;


import cookieParser from 'cookie-parser'
//import routes

import path from "path";
import { staticRouter } from "./router/staticRoutes";
import { signupRouter } from "./router/signup";
import { urlRouter } from "./router/routes";


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extends: false }))
app.use(cookieParser())

//routes
app.use("/url", urlRouter)
app.use("/", staticRouter)
app.use('/signup', signupRouter)

app.listen(port, () => {
    console.log(`Port is sucessfully running on port ${port}`);
})