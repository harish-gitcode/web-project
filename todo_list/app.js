const express = require('express');
const bp = require("body-parser");
const _ =require("lodash");

const app = express();
app.use(bp.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Harish:05Hemant10@cluster0.dapo2.mongodb.net/todolistDB")

const itemSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "No content of task in todo list"]
    }
});

const Item = mongoose.model("Item", itemSchema);

//adding some default items for

const task1 = new Item({
    name: "Buy food"
});
const task2 = new Item({
    name: "Buy Book"
});
const task3 = new Item({
    name: "Cook food"
});

app.get('/', function (req, res) {

    var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    var day = today.toLocaleDateString("en-US", options);

    Item.find({}, function (err, founditem) {


        if (founditem.length === 0) {
            Item.insertMany([task1, task2, task3], function (err) {
                if (err) console.log(err);
                else {
                    console.log("Successful inserted the elements")
                }
            });
        }
        //    console.log(founditem);
        res.render('list', {
            listTitle: "Today " + day,
            items: founditem
        });

    });
});

app.post('/', function (req, res) {
    const itemName = req.body.Data;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({
            name: listName
        }, function (err, foundlist) {
            foundlist.items.push(item);
            foundlist.save();
            res.redirect("/" + listName);
        })
    }
    // res.redirect('/'+listName);
});
app.post('/delete', function (req, res) {
    const checkid = req.body.checkbox;
    const listName = req.body.listName;

    // Item.deleteOne({_id:checkid},function(err){
    //     if(err) console.log(err);
    //     else console.log("Item deleted ")
    // });

    //or we can use findByIdAndRemove
console.log(listName+" "+checkid);
    if (listName.includes("Today")) {
        Item.findByIdAndRemove(checkid, function (err) {
            if (!err){
            console.log("Item deleted ")
            res.redirect("/");
            }
        });
        
    } else {  
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkid}}},function (err,foundlist) {
            if(!err){
                res.redirect("/"+listName);
            }
        });

        
    }

})
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);
app.get("/:para", function (req, res) {
    const customListName = _.capitalize(req.params.para);


    List.findOne({
        name: customListName
    }, function (err, found) {
        if (!err) {
            if (!found) {
                // console.log("List exist")
                const list = new List({
                    name: customListName,
                    items: [task1, task2, task3]
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                //   console.log("List don't exist")
                res.render('list', {
                    listTitle: found.name,
                    items: found.items
                });

            }
        }
    })

})

app.get("/about", function (req, res) {
    res.render("about");
})
let port=process.env.PORT;
if(port==null||port=="") port=3000;
app.listen(port, function () {
    console.log("Server started at port 3000");
});