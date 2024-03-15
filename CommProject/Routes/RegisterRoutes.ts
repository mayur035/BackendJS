import { Router } from "express";
import { signupHandler } from "../Controllers/user";
import passport from "passport";

export const registerRouter = Router();

registerRouter.post('/', signupHandler)
registerRouter.post('/login', passport.authenticate("local",
 { failureRedirect: '/signup', successRedirect: '/' }))

