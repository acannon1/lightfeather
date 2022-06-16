// server/index.js
import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/api/supervisors", (req, res) => {
    fetch('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
        .then(res => res.json())
        .then(json => {
            let temp = json.filter(function(e) {return (/[a-zA-Z]/).test(e.jurisdiction)})
            let retVal = [];
            
            let order = temp.sort((a, b) => {
                let result = a.jurisdiction.localeCompare(b.jurisdiction);
                let result2 = result !== 0 ? result : a.lastName.localeCompare(b.lastName);
                return result2 !== 0 ? result2 : a.firstName.localeCompare(b.firstName);

            })
            
            order.map(item => {
                retVal.push(item.jurisdiction + " - " + item.lastName + ", " + item.firstName);
            })

            res.json(retVal)
        });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post("/api/submit", urlencodedParser, (req, res) => {
    if (!req.body.fName) {
        // res.writeHead(404, {'Content-Type': 'text/html'})
        // res.end('Missing First Name')
        return res.status(404).json({
          msg: "Missing First Name",
        });
    }
    else if (!req.body.lName) {
        return res.status(404).json({
          msg: "Missing Last Name",
        });
    }
    else if (!req.body.supervisor) {
        return res.status(404).json({
          msg: "Missing Supervisor",
        });
    } else {
        return res.status(200).json({
          msg: "Success",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});