// Main html route
var path = require("path")

module.exports = app => {
    app.get("/articles", (req,res) => {
        res.sendFile(path.join(__dirname+"../public/index"))
    })
}