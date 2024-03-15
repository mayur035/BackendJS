const usersData = require('../model/users-data.json');
import fs from 'fs';
import { userSet } from '../services/auth';
import { ERROR_MESSAGE } from '../constant';

export const signupHandler = (req: any, res: any) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.send({ status: ERROR_MESSAGE._NotFound('Data') })
    const userData = {
        name: name,
        email: email,
        password: password
    }
    usersData.push(userData)
    fs.writeFile('./model/usersData.json', JSON.stringify(usersData), async () => {
        return await res.redirect("/login")
    })
}


export const logInHandler = (req: any, res: any) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.send({ status: ERROR_MESSAGE._NotFound('Data')  });
    }

    // Find user by email
    const user = usersData.find((user: any) => user.email === email);

    // Check if user exists
    if (!user) {
        return res.send({ status:ERROR_MESSAGE._NotFound(user)});
    }

    // Check if password matches
    if (user.password !== password) {
        return res.send({ status: ERROR_MESSAGE._NotMatch('password') });
    }
    // userSet(sessionID,user)
    // res.cookie("uid",sessionID)

    //jwt stateless auth
    const token = userSet(user);
    res.cookie('token', token)

    // Authentication successful, redirect to home page or wherever needed
    // return res.json({token});
    return res.redirect('/');
};
