const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlsSchema = new Schema({
    shorten: String,
    target: String,
});

mongoose.model('urls', UrlsSchema);