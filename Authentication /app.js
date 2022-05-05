require('dotenv').config()
const mongoose = require('mongoose');
const bp = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const encrypt = require('mongoose-encryption');
const app = express();
app.use(bp.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/userDB");


const userSchema=new mongoose.Schema({
    username:String,
    password:String 
});


userSchema.plugin(encrypt,{secret:process.env.SECRET ,encryptedFields: ['password']});

const User= new mongoose.model("User", userSchema);



app.get('/', function (req, res) {
    res.render('home');
});
app.get('/register', function (req, res) {

    res.render('register');
});
app.post('/register', function (req, res) {
    const newUser= new User({

        username:req.body.username,
        password:req.body.password
    });
    newUser.save(function (err){
        if(err) console.log(err);
        else{
            res.render('secrets');
        }
    });
    
})
app.post('/login', function (req, res) {

    const username=req.body.username;
    const password=req.body.password;

    User.findOne({ username:username},function (err,found){

        if(err) console.log(err);
        else{
            if(found){
                if(found.password===password){
                    res.render('secrets');
                }
            }

        }

    })
})
app.get('/login', function (req, res) {
    res.render('login');
});

app.listen(3000, function () {
    console.log('listening on port 3000')
});