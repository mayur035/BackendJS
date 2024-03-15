import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
const allUserData = require('../Data/userData.json')

export const initializingPassport = (passport: PassportStatic) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
        try {
            const user = await allUserData.find((userData: any) => userData.email === username)
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            return done(null, user)
        } catch (error) {
            return done(error, false);
        }
    }
    ))

    passport.serializeUser((user: any, done) => {
        done(null, user.email)
    })

    passport.deserializeUser(async (email, done) => {
        try {
            const user = allUserData.find((data: any) => data.email === email);
            if (!user) {
                return done(null, false); // User not found
            }
            return done(null, user); // Return user
        } catch (error) {
            return done(error, false); // Error handling
        }
    });

}