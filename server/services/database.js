const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURI).then(() => console.log('success'))

const Data = mongoose.model('Data', new mongoose.Schema({
    sender: {
        type: String,
        minlength : 2,
        maxlength : 16,
        lowercase : true,
        trim : true
    },
    receiver: {
        type: String,
        minlength : 2,
        maxlength : 16,
        lowercase : true,
        trim : true,
        required: true
    },

    title: {
        type: String,
        minlength : 3,
        maxlength : 80,
        required: true,
    },
    color: { 
        type: String,
        enum : ['red', 'white', 'orange', 'green', 'blue', 'purple'],
        required: true
    },
    emoji: {
        type: String,
        validate : {validator : (v)=> /\p{Emoji}/u.test(v) },
        required: true
    },

    message: { 
        type: String,
        minlength : 3,
        maxlength : 1000,
        required: true,
    },

}, { timestamps: { createdAt: true, updatedAt: null } }))


module.exports = { Data }