// Dependencies
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Routes
module.exports = function (app) {

    // get new articles
    app.get("/scrape", function (req, res) {
        console.log('scrape route hit')
        axios.get("https://www.mprnews.org/")
            .then(response => {
                var $ = cheerio.load(response.data);
                var results = [];
                $("article").each(function (i, element) {
                    var title = $(element).find("h2").text();
                    var url = $(element).find("a").attr("href");
                    var summary = $(element).find(".details").text();
                    var image = $(element).find("figure").find("img").attr("src");
                    if(title&&url&&summary&&image)
                    results.push({title:title, summary:summary, url:url, image:image})
                });
                console.log(results)
                db.Article.insertMany(results, {ordered:1})
                .then(function(dbArticle) {console.log(dbArticle)})
                res.send("Scraped!")
            })
    })

    // view current articles from db
    app.get("/articles", function (req, res) {
        db.Article.find({})
        .then(Articles => res.json(Articles))
    });

    // View note
    app.get("/articles/:id", function (req, res) {
        console.log("article note route hit")
        db.Article.find({ _id: req.params.id }).populate("note")
        .then(Article => res.json(Article))
    });

    // new note
    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
        .then(dbnote => db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { note: dbnote._id } }))
        .then(Article => res.json(Article))
    });
}