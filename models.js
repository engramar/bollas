const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    date: String,
    title: String,
    author: String,    
    keyTakeaways: String,    
    topics: String
});

const Book = mongoose.model('Book', bookSchema)

module.exports = { Book };