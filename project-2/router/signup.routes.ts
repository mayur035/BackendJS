import { Router } from "express";
import { logInHandler, signupHandler } from "../controller/user";

const signupRouter = Router();

signupRouter.post('/',signupHandler)
signupRouter.post('/login',logInHandler)

export {signupRouter}