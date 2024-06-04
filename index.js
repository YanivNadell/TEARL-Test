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

app.get('/', (req, res) => {
    const readData = fs.readFileSync("./data.json", 'utf8').trim();
    res.send(readData); // use send instead of write and end
});


app.post('/', (request, response) => {
    const newsData = request.body; // request.body is already an object

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return response.status(500).send('Error reading file');
        }

        let dataObject;
        try {
            dataObject = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON from file:', err);
            return response.status(500).send('Error parsing JSON from file');
        }

        if (newsData.type === 'plane') {
            dataObject.plane = newsData;
        } else if (newsData.type === 'camera') {
            dataObject.camera = newsData;
        }

        fs.writeFile('./data.json', JSON.stringify(dataObject, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Error writing file');
            }

            response.send('Data updated successfully');
        });
    });
});

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//when server has started
app.listen(8000, () => {
    console.log('server started');
    // console.log(appadress);
});