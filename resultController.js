const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Result = mongoose.model('Result');

router.get('/', (req, res) => {
    res.render("result/addOrEdit2", {
        viewTitle: "Result Details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var result = new Result();
    result.partyName = req.body.partyName;
    result.votes = req.body.votes;
    result.date = req.body.date;

    result.save((err, doc) => {
        if (!err)
            res.redirect('result/list2');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("result/addOrEdit2", {
                    viewTitle: "Insert Result Details",
                    result: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Result.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('result/list2'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("result/addOrEdit2", {
                    viewTitle: 'Update Result',
                    result: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list2', (req, res) => {
    Result.find((err, docs) => {
        if (!err) {
            res.render("result/list2", {
                list2: docs
            });
        }
        else {
            console.log('Error in retrieving result list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'partyName':
                body['partyNameErroe'] = err.errors[field].message;
                break;
            case 'votes':
                body['votesError'] = err.errors[field].message;
                break;
            case 'date':
                body['dateError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Result.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("result/addOrEdit2", {
                viewTitle: "Update Result",
                result: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Result.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/result/list2');
        }
        else { console.log('Error in Result delete :' + err); }
    });
});

module.exports = router;