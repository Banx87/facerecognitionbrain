const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public/'));

/*
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('<h1>HELLLLOOO</h1>');
    next();
});

/!*app.get('/', (req, res) => {
    res.send("testest");
});*!/

app.get('/', (req, res) => {
    //console.log(req.query);
    //req.body
    //console.log(req.header);
    //console.log(req.params);
    res.status(404).send("not found");
});
*/

/*app.get('/profile', (req, res) => {
 res.send("getting profile");
});
app.post('/profile', (req, res) => {
    console.log(req.body);*/
    /* const user = {
        name: 'Sally',
        hobby: 'soccer'
    };*/
    //res.send(user);
//});


app.listen(3000);

/*
const http = require('http');

const server = http.createServer((request, response) => {
    //console.log('headers', request.headers);
    console.log('method', request.method);
    console.log('url', request.url);
    const user = {
        name: 'John',
        hobby: 'Skating'
    };
   response.setHeader('Content-Type', 'application/json');
   response.end(JSON.stringify(user));
});

server.listen(3000);*/
