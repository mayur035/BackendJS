"use strict";
const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;
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
    const userID = Number(req.params.id);
    const user = users.find((user) => user.id === userID);
    return res.json(user);
}).patch((req, res) => {
    //edit user using id
    const userID = Number(req.params.id);
    const updateData = req.body;
    const userIndex = userID - 1;
    if (userIndex > 0 && userIndex < users.length) {
        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), updateData);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: 'update sucessfully', id: userID });
        });
    }
}).delete((req, res) => {
    //delete user using id
    const userID = Number(req.params.id);
    const user = users.filter((user) => user.id !== userID);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, data) => {
        return res.json({ status: 'delete sucessfully', id: userID });
    });
});
app.post('/api/users', (req, res) => {
    const data = req.body;
    users.push(Object.assign(Object.assign({}, data), { id: users.length + 1 }));
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //create new user
        return res.json({ status: 'create successfully', id: users.length });
    });
});
app.listen(port, () => console.log(`Server is listening on port ${port}`));
