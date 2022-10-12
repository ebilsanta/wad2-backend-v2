const express = require('express')
const mongodb = require('mongodb')
const {MongoClient} = require('mongodb');

const router = express.Router();

const uri = process.env.MONGODB_URI || 'mongodb+srv://basedAdmin:cringe123@wad2.rlbhxwm.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

// get all users
router.get('/', async (req, res) => {
	const users = await loadUserCollection();
	res.send(await users.find({}).toArray());
})

// add one user 
router.post('/', async (req, res) => {
	const users = await loadUserCollection();
	await users.insertOne({
		userName: req.body.userName,
		userPassword: req.body.userPassword,
		userAge: req.body.userAge,
		userGender: req.body.userGender,
		attendedEvents: [],
		attendingEvents: [],
		eventsCreated: []
	});
	res.status(201).send();
})

// delete user
router.delete('/:id', async(req, res) => {
	const users = await loadUserCollection();
	await users.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
	res.status(200).send();
})

async function loadUserCollection() {
	await client.connect();
	return client.db('wad2').collection('user');
}



module.exports = router;