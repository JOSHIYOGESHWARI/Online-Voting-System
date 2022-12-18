const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');

router.get('/', (req, res) => {
    res.render("candidate/addOrEdit1", {
        viewTitle: "Insert Candidate Details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var candidate = new Candidate();
    candidate.candidateName = req.body.candidateName;
    candidate.age = req.body.age;
    candidate.city = req.body.city;
    candidate.ward = req.body.ward;
    candidate.partyName = req.body.partyName;
    candidate.symbol = req.body.symbol;
    candidate.save((err, doc) => {
        if (!err)
            res.redirect('candidate/list1');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("candidate/addOrEdit1", {
                    viewTitle: "Insert Candidate Details",
                    candidate: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Candidate.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('candidate/list1'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("candidate/addOrEdit1", {
                    viewTitle: 'Update Candidate',
                    candidate: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list1', (req, res) => {
    Candidate.find((err, docs) => {
        if (!err) {
            res.render("candidate/list1", {
                list1: docs
            });
        }
        else {
            console.log('Error in retrieving candidate list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'candidateName':
                body['candidateNameError'] = err.errors[field].message;
                break;
            case 'age':
                body['ageError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            case 'ward':
                body['wardError'] = err.errors[field].message;
                break;
            case 'partyName':
                body['PartyNameError'] = err.errors[field].message;
                break;
            case 'symbol':
                body['symbolError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Candidate.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("candidate/addOrEdit1", {
                viewTitle: "Update Candidate",
                candidate: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Candidate.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/candidate/list1');
        }
        else { console.log('Error in Candidate delete :' + err); }
    });
});

module.exports = router;