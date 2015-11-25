var express = require('express'),
    app = express(),
    contacts = [{
        name: 'Jo'
    }, {
        name: 'Jane'
    }]
;


app.get('/contacts', function(req, res) {
    res.status(200).json(contacts);
});

app.listen(9001);
