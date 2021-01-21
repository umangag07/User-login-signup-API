let mongoose = require('mongoose')

let Schema = mongoose.Schema({
    title:{
       type:String,
       required:true
    },

    author:{
       type:String,
       required:true
    },

    body:{
       type:String,
       
    },
})

module.exports = mongoose.model('MyArticle', Schema);