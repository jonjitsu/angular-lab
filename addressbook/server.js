var express = require('express'),
    cors = require('cors')
    app = express(),
    contacts = [{
        name: 'Jo'
    }, {
        name: 'Jane'
    }]
;

app.use(cors());

app.get('/contacts', function(req, res) {
    res
        .status(200).json(contacts);
});

app.listen(9001);
