const handleProfileGet = (req, res, db) => {
	const { id } = req.params;

	db('users')
		.select('*')
		.where({id})
		.then(user => {
			if(user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('user not found');
			}
		})
		.catch(err => res.status(400).json('id is not valid'));
}

module.exports = {
	handleProfileGet: handleProfileGet
}