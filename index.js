require("dotenv").config({ path: "./.env" }); //Keep this at top of your file
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require("body-parser");

const { Book } = require("./models");

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

module.exports = () => {
    config(); //invoking the dotenv config here   
};

mongoose.connect(`${process.env.DB_URI}`, {dbName: 'books_db'})    
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.get('/', async (req, res) => {  
    const allBooks = await Book
        .find()
        .sort({ date: 1 })
        .select({ date: 1, title: 1, author: 1, keyTakeaways: 1, topics: 1 });
    
    return res.render('pages/index', {
        allBooks: allBooks
    });
});  

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});