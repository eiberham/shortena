const mongoose = require('mongoose');
const shortid = require('shortid');
const Urls = mongoose.model('urls');

export const resolvers = {
    Mutation: {
        shorten: (root, {url}, req) => {
            const code = shortid.generate();
            const urls = new Urls({
                short: `${code}`,
                target: url
            });

            return urls.save();
        },
    },
};