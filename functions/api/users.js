const express = require('express')
const mongodb = require('mongodb')
const {MongoClient} = require('mongodb');
require('dotenv').config();

const router = express.Router();

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

// get all users
router.get('/', async (req, res) => {
	const users = await loadUserCollection();
	res.send(await users.find({}).toArray());
})

// sign-in using Google. if email exists, return user, else return "Register"
router.post('/g-signin', async (req, res) => {
	const users = await loadUserCollection();
	const userFound = await users.findOne({userEmail: req.body.userEmail});
	if (userFound == null) {
		res.send("Register")
	} else {
		res.send(userFound);
	}
})

// normal sign-in: check if user exists, if so then check if password correct, then return user. if user
// doesn't exist, return "Register". if user exists but pw incorrect, return "Incorrect password"
router.post('/signin', async (req, res) => {
	const users = await loadUserCollection();
	const userFound = await users.findOne(
		{
			userEmail: req.body.userEmail,
		}
	);
	if (userFound == null) {
		res.send("Register")
	} else if (userFound.userPassword != req.body.userPassword) {
		res.send("Incorrect password");
	} else {
		res.send(userFound);
	}
})

// register normally one user 
router.post('/register', async (req, res) => {
	const users = await loadUserCollection();
	const userExist = await users.findOne(
		{
			userEmail: req.body.userEmail,
		}
	)
	if (!userExist) {
		const newUser = {
			userName: req.body.userName,
			userPassword: req.body.userPassword,
			userEmail: req.body.userEmail,
			registeredEvents: [],
			createdEvents: [],
			categoryPrefs: []
		};
		await users.insertOne(newUser);
		res.status(201).send(newUser);
	} else {
		res.send("User Exists")
	}
	
})

router.post('/register', async (req, res) => {
	const users = await loadUserCollection();
	await users.insertOne({
		userName: req.body.userName,
		userPassword: req.body.userPassword,
		userAge: req.body.userAge,
		userEmail: req.body.userEmail,
		userGender: req.body.userGender,
		registeredEvents: [],
		createdEvents: [],
		categoryPrefs: []
	});
	res.status(201).send();
})

// Update user's list of registeredEvents by sending userEmail and new registeredEvents list
router.patch('/registered', async (req, res) => {
	const users = await loadUserCollection();
	await users.updateOne(
		{userEmail: req.body.userEmail}, 
		{
			$set: {
			"registeredEvents" : req.body.registeredEvents
			}
		}
	);
	res.status(200).send();
})

// Update user's list of createdEvents by sending userEmail and new createdEvents list
router.patch('/created', async (req, res) => {
	const users = await loadUserCollection();
	await users.updateOne(
		{userEmail: req.body.userEmail}, 
		{
			$set: {
			"createdEvents" : req.body.createdEvents
			}
		}
	);
	res.status(200).send();
})

// Update user's list of categoryPrefs by sending userEmail and new categoryPrefs list
router.patch('/prefs', async (req, res) => {
	const users = await loadUserCollection();
	await users.updateOne(
		{userEmail: req.body.userEmail}, 
		{
			$set: {
			"categoryPrefs" : req.body.categoryPrefs
			}
		}
	);
	res.status(200).send();
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

// update user details
router.put('/:id', async (req, res) => {
	const users = await loadUserCollection();
	await users.updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: {
		userName: req.body.userName,
		userPassword: req.body.userPassword,
		userAge: req.body.userAge,
		userGender: req.body.userGender,
		userFirstName: req.body.userFirstName,
		userLastName: req.body.userLastName,
	}});
	res.status(200).send();
})


module.exports = router;