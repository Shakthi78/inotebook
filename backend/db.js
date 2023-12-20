const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/inotebook1');
    console.log("Connected to Mongo");
}

module.exports = connectToMongo;