const mongoose = require('mongoose');
const shortid = require('shortid');

const Urls = mongoose.model('urls');

export const resolvers = {
    Mutation: {
        shorten: (root, {url}, req) => {
            const baseUrl = new URL(url).origin;
            const code = shortid.generate();

            const urls = new Urls(`${baseUrl}/${code}`, url);
            return urls.save();
        },
    },
};