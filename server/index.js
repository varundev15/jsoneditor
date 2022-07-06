const express = require('express')
const fs = require('fs');
const app = express()
const port = 5000
const cors = require('cors');
let json_file = require('./file.json');


app.use(cors({ credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get('/get-file', (req, res) => {
    res.status(200).send(json_file);
})

app.post('/save-file', (req, res) => {
    let new_json_file = req.body.new_file;
    console.log(new_json_file);
    let fileName = 'file.json';
    fs.writeFile(fileName, JSON.stringify(new_json_file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(new_json_file));
        console.log('writing to ' + fileName);
    });
    res.send({});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})