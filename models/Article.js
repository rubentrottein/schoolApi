const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String
    },
    alt: {
        type: String
    },
    intro: {
        type: String
    },
    content: {
        type: String
    },
    category: {
        type: String
    },
    chapters: {
        type: Number
    },
    chaptersTitles: [{
        type: String
    }],
    chaptersContent: [{
        type: String
    }]
},
{ timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;