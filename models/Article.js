var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Article contructor
var ArticleSchema = new Schema({
    headline: {
        type: String,
    },
    summary: {
        type: String,
    },
    url: {
        type: String,
    },
    // Related notes
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create model
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;