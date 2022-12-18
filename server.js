require('./models/db');
require('./models/db1');
require('./models/db2');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const voterController = require('./controllers/voterController');
const candidateController = require('./controllers/candidateController');
const resultController = require('./controllers/resultController');
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(4001, () => {
    console.log('Express server started at port : 4001');
});

app.use('/voter', voterController);
app.use('/candidate', candidateController);
app.use('/result', resultController);