const express = require('express')
const path = require('path')
//Init app
const PORT = 5000;
let app = express()


//Load view engine
app.set('views', path.join(__dirname,'views'))
app.set('view engine','pug');

//Home route
app.get("/",(req,res)=>{
      res.render('index',{title:'Passed obj to pug'})
})


//start server
app.listen(PORT || 3000,(err)=>{
    if(err) console.log(err)
    console.log("yesss we made it")
    
})