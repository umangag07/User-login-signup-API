const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyparser =require('body-parser')
const cors = require('cors')
require('dotenv/config')


//Init app
const PORT = 5000;
let app = express()

//Midle ware
app.use(bodyparser.json());
app.use(cors());


//Load view engine
 app.set('views', path.join(__dirname,'views'))
 app.set('view engine','pug');

//Home route
app.get("/",(req,res)=>{
     res.send("we on home")
});

const ArticleRoute = require('./Routes/ArticleRoute')
app.use('/article', ArticleRoute);



//Database connect

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
      if(err) console.log(err)
      console.log("COnnected to the db")
})

//start server
app.listen(PORT || 3000,(err)=>{
    if(err) console.log(err)
    console.log("yesss we made it")
    
})