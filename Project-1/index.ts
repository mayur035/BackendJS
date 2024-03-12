const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;

//middleware
app.use(express.urlencoded({ extended: false }))

app.use((req:any,res
    :any,next:any)=>{
    fs.appendFile('log.txt',`\n ${Date.now()} : ${req.id} ${req.method} : ${req.path}`,(err:any,data:any)=>{
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
    const userID = Number(req.params.id)
    const user = users.find((user: any) => user.id === userID)
    return res.json(user)
}).patch((req: any, res: any) => {
    //edit user using id
    const userID = Number(req.params.id)
    const updateData = req.body
    const userIndex = userID - 1;
    if(userIndex > 0 && userIndex < users.length){
        users[userIndex] = {...users[userIndex],...updateData}
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err:any,data:any)=>{
            return res.json({ status:'update sucessfully',id:userID})
        })
    }
}).delete((req: any, res: any) => {
    //delete user using id
    const userID = Number(req.params.id)
    const user = users.filter((user: any) => user.id !== userID)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err: any, data: any) => {
        return res.json({ status: 'delete sucessfully', id: userID })
    })
})

app.post('/api/users', (req: any, res: any) => {
    const data = req.body
    users.push({ ...data, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err: any, data: any) => {
        //create new user
        return res.json({ status: 'create successfully', id: users.length })
    })
})
app.listen(port, () => console.log(`Server is listening on port ${port}`))