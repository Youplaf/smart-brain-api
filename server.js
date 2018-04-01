const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {

});

app.get('/profile/:userId', (req, res) => {

});

app.post('/signin', (req, res) => {

});

app.post('/register', (req, res) => {

});

app.put('/image', (req, res) => {

});

app.listen(3000, () => {
	console.log('app running on port 3000');
});