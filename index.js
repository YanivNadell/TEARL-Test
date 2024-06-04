const express = require('express');
const cors = require("cors");
const fs = require('fs');
const os = require('os')
//------------------------------------------------------------------------

// const port = 3000
// const appip = os.networkInterfaces().eth0[1].address
// const appadress = 'http://['+ appip + ']:8000/'

//creating an API
const app = express();
app.use(cors());
app.use(express.json());

//------------------------------------------------------------------------

app.get('/plane', (req, res) => {
    const readData = fs.readFileSync("./plane.json", 'utf8').trim();
    res.send(readData); // use send instead of write and end
});
app.get('/camera', (req, res) => {
    const readData = fs.readFileSync("./camera.json", 'utf8').trim();
    res.send(readData); // use send instead of write and end
});


app.post('/plane', (req, res) => {
    const newData = req.body;

    fs.writeFile('./plane.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
        res.send('Data set successfully');
    });
});
app.post('/camera', (req, res) => {
    const newData = req.body;

    fs.writeFile('./camera.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
        res.send('Data set successfully');
    });
});

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//when server has started
app.listen(8000, () => {
    console.log('server started');
});