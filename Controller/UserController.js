const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.getAllUser = async (req, res) => {
    try {
      const Users = await User.find();
      console.log(Users);
      res.send(Users);
    } catch (err) {
      console.log(err);
    }
  };

exports.userSignIn = (req,res)=>{
    if(Object.keys(req.body).length === 2){
        User.find({email:req.body.email})
             .exec()       // Match the object or string and if matched it return as it is otherwise null
             .then((user)=>{
               //   console.log(user[0].password);
                 if(user.length>=1){
                     bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                         if(err){
                             res.status(403).send("User not authorized");
                         }
                         else{
                             if(result == true){
                               res.status(200).send("User Authorized Successfully");
                             }else{
                               res.status(403).send("User not authorized");
                             }
                         }
                     } )
                 }else{
                   res.status(403).send("User not found");
                 }
             })
    }else{
        res.status(400).send("Required fields not found")
    }
} 

exports.userSignUp = (req, res) => {
    console.log(Object.keys(req.body).length);
    if (Object.keys(req.body).length === 2) {
      User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            console.log("kzhdbjsdbvsd vhsdv "+ user.length)
          if (user.length >= 1) {
            res.send("User Exists");
            console.log("user exists");
          } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              if (err) {
                console.log("Password not hashed error occured" + err);
              } else {
                const NewUser = new User({
                  email: req.body.email,
                  password: hash,
                });
                console.log(NewUser);
                NewUser.save()
                  .then((result) => res.send("User created successfully"))
                  .catch((err) => console.log("error occured"));
              }
            });
          }
        })
        .catch((err) => {
          console.log("error in finding user");
        });
    } else {
      res.send("Enter all the needed fields to signup");
    }
  }

exports.delete = (req, res)=>{
    console.log(req.params.userId);
    User.find({_id:req.params.userId},(err, result)=>{
        console.log(result)
        if(err){
            console.log("1"+err)
        }
        else{
            if(result.length>=1){
                console.log(result)
                User.deleteOne({_id:req.params.userId})
                .exec()
                .then(result=>{
                    console.log("user removed" + result)
                    res.status(200).send("User removed successfully")
                })
                .catch(err =>{
                    console.log(err)
                    res.send(503).body(err)
                })
            }else{
                res.status(404).send("User not found")
            }
           
        }
    })
    
}