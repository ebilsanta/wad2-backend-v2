const express = require('express')
const mongodb = require('mongodb')
const {MongoClient} = require('mongodb');

const router = express.Router();

const uri = process.env.MONGODB_URI || 'mongodb+srv://basedAdmin:cringe123@wad2.rlbhxwm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// get all events
router.get('/', async (req, res) => {
	const events = await loadEventCollection();
	res.send(await events.find({}).toArray());
})

// create event
router.post('/', async (req, res) => {
	const events = await loadEventCollection();
	await events.insertOne({
        eventID: req.body.eventID,
        eventDate: new Date(),
        eventLocation: req.body.eventLocation,
        attendees: []
	});
	res.status(201).send();
})

// delete event
router.delete('/:id', async(req, res) => {
	const events = await loadEventCollection();
	await events.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
	res.status(200).send();
})

async function loadEventCollection() {
	await client.connect();
	return client.db('wad2').collection('event');
}

module.exports = router;