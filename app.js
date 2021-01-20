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
    let articles = [
        {
            Id:1,
            Title:'Article one',
            Author:'Author 1'
        },
        {
            Id:2,
            Title:'Article two',
            Author:'Author 2'
        },
        {
            Id:3,
            Title:'Article thee',
            Author:'Author 3'
        },
    ]
      res.render('index',{title:'Passed obj to pug',articles:articles})
});

//Add route

app.get('/pages/add', (req,res)=>{
    res.render('add',{title:'Add template'})
})


//start server
app.listen(PORT || 3000,(err)=>{
    if(err) console.log(err)
    console.log("yesss we made it")
    
})