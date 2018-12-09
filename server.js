const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/data', (req, res) => res.status(200).json(data));

app.post('/data', (req, res) => {
    const newData = JSON.stringify(data.push(req.body));
    fs.writeFile('./data.json', newData, 'utf8', function(err, success) {
        if (err) {
            res.status(400).json({'error': 'error in writing data'})
            return;
        }
        res.status(200).json({'success': 'data written to file'});
    })
});

app.get('/fetch-user/:userId', (req, res) => {
    const existingData = require('./data.json');
    const result = existingData.find(i => i.id === parseInt(req.params.userId, 10));
    if (result) {
        return res.json(result);
    } else {
        return res.status(404).json({'error': 'User not found'});
    }
});

app.listen(3000, () => console.log(`Example app listening on port ${3030}!`));