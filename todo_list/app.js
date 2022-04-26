const express = require('express');
const bp = require("body-parser");

const app = express();
app.use(bp.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
var Items=[];
var item="";
app.get('/', function (req, res) {

    var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    var day = today.toLocaleDateString("en-US", options);

  
    res.render('list', {
        listTitle: day,
        Items: Items
    });

});
var WorkItem=[];
app.get('/work',function(req,res){

    res.render('list', {
        listTitle: "Work List",
        Items: WorkItem
    })
});

app.get("/about",function(req,res){
    res.render("about");
})

app.post('/', function (req, res) {
    item=req.body.Data;
    if(req.body.list==="Work"){
        WorkItem.push(item);
        res.redirect("/work");
    }
    else{
        Items.push(item);
        res.redirect('/');
    }
});