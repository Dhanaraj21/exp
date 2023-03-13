const express = require('express');
const bodyParser = require('body-parser');
const router =  require('./Routes/Routes');
const mongoose = require('mongoose');
const hostname = "localhost";
const port = "8088";
const app = express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
app.use('/',router);

mongoose.connect('mongodb://127.0.0.1:27017/restaurants',
    {useNewUrlParser : true ,useUnifiedTopology : true }
).then(client => {
    app.listen(port,hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
    });
}).catch(err => {
    console.log(err);
})