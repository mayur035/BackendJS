const express = require('express')
const app = express();
const port=8000;

//import routes
const urlRoutes = require('./router/routes')

app.use(express.json())
app.use("/url",urlRoutes)

app.listen(port,()=>{
    console.log(`Port is sucessfully running on port ${port}`);
})