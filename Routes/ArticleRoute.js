const express = require('express')
const router = express.Router()
const Article = require('../models/Article')

router.get('/', async (req,res)=>{
      try{
          const article = await Article.find();
          console.log(article);
          res.render('index',{title:"title",articles:article})
      }catch(err){
          console.log(err);
          res.status(401).send({Error:"we found error"})
      }
})

router.post('/add', async(req,res)=>{
      console.log(req.body);
      const NewArticle = new Article({
          title:req.body.title,
          author:req.body.author,
          body:req.body.body
      })
      try{
          const savedPost = await NewArticle.save()
          console.log(savedPost)
          res.json(savedPost)
      }catch(err){
          console.log(err)
      }
})

module.exports = router