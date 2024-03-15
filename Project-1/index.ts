const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;
import uniqid from 'uniqid';

//middleware
app.use(express.urlencoded({ extended: false }))

app.use((req: any, res: any, next: any) => {
    fs.appendFile('log.txt', `\n ${Date.now()} : ${req.id} ${req.method} : ${req.path}`, (err: any, data: any) => {
        next();
    })
})

//routes
app.get('/users', (req: any, res: any) => {
    const HTML = `
    <ul>
    ${users.map((user: any) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    return res.send(HTML)
})

//REST
app.get('/api/users', (req: any, res: any) => {
    return res.json(users)
})
app.route('/api/users/:id').get((req: any, res: any) => {
    const {params: {id}} = req;
    const userID = +id
    const user = users.find((user: any) => user.id === userID)
    return res.json(user)
}).patch((req: any, res: any) => {
    const userID = req.params.id;
    const updateData = req.body;
    const userIndex = users.find((user: any) => user.id === userID);

    if (!userIndex) 
        return res.status(404).json({ error: 'User not found' });
    

    users[userIndex] = { ...userIndex, ...updateData };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err: any, data: any) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ status: 'update successfully', id: userID });
    });
}).delete((req: any, res: any) => {
    //delete user using id
    const userID = req.params.id
    const user = users.filter((user: any) => user.id !== userID)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err: any, data: any) => {
        return res.json({ status: 'delete sucessfully', id: userID })
    })
})

app.post('/api/users', (req: any, res: any) => {
    const data = req.body
    users.push({ ...data, id: uniqid() })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err: any, data: any) => {
        //create new user
        return res.json({ status: 'create successfully' })
    })
})
app.listen(port, () => console.log(`Server is listening on port ${port}`))