const mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
    partyName:{
        type:String
    },
    votes: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    }
});

mongoose.model('Result', resultSchema);
