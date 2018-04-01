const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: '$2a$10$EK1fn35kxcCY4LcbRHvqV.u//1TbAcLTndKWjdSvJDkwR3Z4MHkHu', //cookies
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: '$2a$10$ftP2Dgh2xNBLo8BiMCkbI.vD0pgLrjk0jKw638XRi98Fdhm.X7y2C', //bananas
			entries: 0,
			joined: new Date()
		}
	]
}


app.get('/', (req, res) => {
	res.json(database.users);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if(!found) {
		res.status(400).json('no such user');
	}
});

app.post('/signin', (req, res) => {
	const { email, password } = req.body;

	if(email === database.users[0].email) {
		bcrypt.compare(password, database.users[0].password, function(err, result) {
		    if(result === true) {
		    	res.json('success');
		    } else {
				res.status(400).json('error logging in');
			}
		});
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;

	bcrypt.hash(password, null, null, function(err, hash) {

		database.users.push({
			id: '125',
			name: name,
			email: email,
			password: hash,
			entries: 0,
			joined: new Date()
		});

		res.json(database.users[database.users.length-1]);
	});
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if(!found) {
		res.status(400).json('no such user');
	}	
});

app.listen(3000, () => {
	console.log('app running on port 3000');
});