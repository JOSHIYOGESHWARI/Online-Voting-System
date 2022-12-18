const mongoose = require('mongoose');

var voterSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    },
    city: {
        type: String
    },
    sex: {
        type: String
    }
});


mongoose.model('Voter', voterSchema);
