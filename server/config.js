require('dotenv').config();

module.exports = {
    MONGODB_URI: 'mongodb+srv://latkavitalii:0807dtnfk@cluster0.jzjhzae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    SECRET_KEY: process.env.SECRET_KEY || 'default_secret_key',
};
