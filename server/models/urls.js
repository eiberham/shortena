const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlsSchema = new Schema({
    short: String,
    target: String,
});

mongoose.model('urls', UrlsSchema, 'urls');