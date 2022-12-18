const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Voter = mongoose.model('Voter');

router.get('/', (req, res) => {
    res.render("voter/addOrEdit", {
        viewTitle: "Insert Voter Details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var voter = new Voter();
    voter.fullName = req.body.fullName;
    voter.date = req.body.date;
    voter.city = req.body.city;
    voter.sex = req.body.sex;
    voter.save((err, doc) => {
        if (!err)
            res.redirect('voter/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("voter/addOrEdit", {
                    viewTitle: "Insert Voter Details",
                    voter: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Voter.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('voter/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("voter/addOrEdit", {
                    viewTitle: 'Update Voter',
                    voter: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list', (req, res) => {
    Voter.find((err, docs) => {
        if (!err) {
            res.render("voter/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving voter list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'date':
                body['dateError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
                case 'sex':
                    body['sexError'] = err.errors[field].message;
                    break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Voter.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("voter/addOrEdit", {
                viewTitle: "Update Voter",
                voter: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Voter.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/voter/list');
        }
        else { console.log('Error in Voter delete :' + err); }
    });
});

module.exports = router;