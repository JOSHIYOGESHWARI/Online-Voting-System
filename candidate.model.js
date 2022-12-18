const mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({

    candidateName: {
        type: String,
        required: 'This field is required.'
    },
    age: {
        type: String
    },
    city: {
        type: String
    },
    ward: {
        type: String
    },
    partyName: {
        type: String
    },
    symbol: {
        type: String
    }
});
// Custom validation for email


mongoose.model('Candidate', candidateSchema);
