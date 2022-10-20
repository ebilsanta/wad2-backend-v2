const express = require('express')
const mongodb = require('mongodb')
const {MongoClient} = require('mongodb');
require('dotenv').config();

const router = express.Router();

const uri = process.env.MONGODB_URI
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
        eventDate: new Date(req.body.eventDate), //need to update
        eventLocation: req.body.eventLocation,
        eventCategory: req.body.eventCategory,
        eventDesc: req.body.eventDesc,
        attendees: [],
        eventPhotoURL: req.body.eventPhotoURL,
        eventName: req.body.eventName,
        eventReviews: []
  });
  res.status(201).send();
})

// delete event
router.delete('/:id', async(req, res) => {
  const events = await loadEventCollection();
  await events.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
  res.status(200).send();
})

//filter event by date range
router.post('/date', async(req, res) => {
  const queriedDateStart = req.body.dateStart;
  const queriedDateEnd = req.body.dateEnd;
  // res.send(Date(queriedDateStart));

  const events = await loadEventCollection();
  // res.send(await events.find({}).toArray());
  
  const filteredEvents = await events.find({
    eventDate: {
      $gte: new Date(queriedDateStart),
      $lte: new Date(queriedDateEnd)
    }
  }).toArray();
  res.send(filteredEvents);
  });

//  filter events by categories 
router.post('/categories', async(req, res) => {
  const arrayOfCategories = req.body.categories; //the json input must be in array format  
  // res.send(arrayOfCategories);

  const events = await loadEventCollection();
  
  const filteredEvents = await events.find({
    eventCategory: {
      $in: arrayOfCategories
    }
  }).toArray();
  res.send(filteredEvents);
  });

  //filter event by location
router.post('/location', async(req, res) => {
  console.log("This is me trying to get events by location");
  // input: long lat

  const queriedLong = req.body.eventLong;
  const queriedLat = req.body.eventLat;

  const events = await loadEventCollection();
  res.send(await events.find({}).toArray());
  // returns the whole events table, then process on the front end to find the locations
  
})

router.patch('/reviews', async(req, res) => {
  const events = await loadEventCollection();
  const newReviewsList = req.body.eventReviews;
  const eventID = req.body._id;
  await events.updateOne(
    {_id: mongodb.ObjectId(eventID)},
    {$set:{eventReviews: newReviewsList}}
  );
  res.status(200).send();
})

router.patch('/attendees', async(req, res) => {
  const events = await loadEventCollection();
  const newAttendeesList = req.body.attendees;
  const eventID = req.body._id;
  await events.updateOne(
    {_id: mongodb.ObjectId(eventID)},
    {$set:{attendees: newAttendeesList}}
  );
  res.status(200).send();
})

async function loadEventCollection() {
  await client.connect();
  return client.db('wad2').collection('event');
}

module.exports = router;