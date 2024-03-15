"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializingPassport = void 0;
const passport_local_1 = require("passport-local");
const allUserData = require('../Data/userData.json');
const initializingPassport = (passport) => {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield allUserData.find((userData) => userData.email === username);
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error, false);
        }
    })));
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = allUserData.find((data) => data.email === email);
            if (!user) {
                return done(null, false); // User not found
            }
            return done(null, user); // Return user
        }
        catch (error) {
            return done(error, false); // Error handling
        }
    }));
};
exports.initializingPassport = initializingPassport;
