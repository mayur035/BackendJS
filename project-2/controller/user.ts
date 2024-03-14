const usersData = require('../model/usersData.json');
import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
import { userSet } from '../services/auth';


const signupHandler = (req: any, res: any) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.send({ status: 'Enter data!' })
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


const logInHandler = (req: any, res: any) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.send({ status: 'Enter email and password!' });
    }

    // Find user by email
    const user = usersData.find((user: any) => user.email === email);

    // Check if user exists
    if (!user) {
        return res.send({ status: 'User not found!' });
    }

    // Check if password matches
    if (user.password !== password) {
        return res.send({ status: 'Incorrect password!' });
    }

    // const sessionID = uuidv4();
    // userSet(sessionID,user)
    // res.cookie("uid",sessionID)

    //jwt stateless auth
    const token = userSet(user);
    // res.cookie('uid',token)

    // Authentication successful, redirect to home page or wherever needed
    return res.json({token});
};


export { signupHandler, logInHandler }