"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;
const uniqid_1 = __importDefault(require("uniqid"));
//middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n ${Date.now()} : ${req.id} ${req.method} : ${req.path}`, (err, data) => {
        next();
    });
});
//routes
app.get('/users', (req, res) => {
    const HTML = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(HTML);
});
//REST
app.get('/api/users', (req, res) => {
    return res.json(users);
});
app.route('/api/users/:id').get((req, res) => {
    const { params: { id } } = req;
    const userID = +id;
    const user = users.find((user) => user.id === userID);
    return res.json(user);
}).patch((req, res) => {
    const userID = req.params.id;
    const updateData = req.body;
    const userIndex = users.find((user) => user.id === userID);
    if (!userIndex)
        return res.status(404).json({ error: 'User not found' });
    users[userIndex] = Object.assign(Object.assign({}, userIndex), updateData);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ status: 'update successfully', id: userID });
    });
}).delete((req, res) => {
    //delete user using id
    const userID = req.params.id;
    const user = users.filter((user) => user.id !== userID);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, data) => {
        return res.json({ status: 'delete sucessfully', id: userID });
    });
});
app.post('/api/users', (req, res) => {
    const data = req.body;
    users.push(Object.assign(Object.assign({}, data), { id: (0, uniqid_1.default)() }));
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //create new user
        return res.json({ status: 'create successfully' });
    });
});
app.listen(port, () => console.log(`Server is listening on port ${port}`));
