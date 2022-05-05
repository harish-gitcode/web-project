const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bp.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/WikiDB");

const wikiSchema = {
    title: String,
    content: String
}
const Article = mongoose.model('Article', wikiSchema);


app.route("/articles")
    .get(function (req, res) {


        Article.find({}, function (err, result) {

            if (err) res.send(err);
            else {
                res.send(result);
            }
        });

    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function (err) {
            if (err) res.send(err);
            else res.send("Successfully added the new Article");
        });

    })
    .delete(function (req, res) {

        Article.deleteMany({}, function (err) {
            if (err) res.send(err);
            else res.send("Successfully deleted all the Article");
        });

    });

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, found) {
            if (found) {
                //res.write(req.body.articleTitle);
                res.send(found);
            } else {
                res.send("No articles were found matching to this title");
            }
        });

    })
    .put(function(req, res){
        Article.updateOne({title:req.params.articleTitle},
            {title:req.body.title,content:req.body.content},
            {upsert: true},
        function (err){
            if(err) res.send(err);
            else res.send("Successfully updated the conent of a article");
        })
    })
    .patch(function(req, res){
        Article.updateOne({title:req.params.articleTitle},
            {$set:req.body},
            function (err){
                if(err) res.send(err);
                else res.send("Successfully updated the conent of a article using patch request");
            })
    })
    .delete(function(req, res){
        Article.deleteOne({title:req.params.articleTitle},
            function (err){
                if(err) res.send(err);
                else res.send("Successfully deleted the article")
            })
    });





app.listen(3000, function () {
    console.log("Server started at port 3000");
});