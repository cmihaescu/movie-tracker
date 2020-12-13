const { Progress } = require('@chakra-ui/react');
const express = require('express');
const db = require('./db');
const { sleep } = require('./utils');

const router = express.Router();

router.get('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await db.movies.findOne({ movieId });

  await sleep(); // force increase latency, simulates real life experience. Delete this on prod
  if (!movie) {
    res.sendStatus(404);
  } else {
    res.send(movie);
  }
});

//WATCHLIST

router.put('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movieData = req.body;
  delete movieData._id; // Mongo don't let us update this field
  const movie = await db.movies.findOneAndUpdate(
    { movieId },
    { $set: movieData },
    { returnOriginal: false, upsert: true },
  );

  await sleep();
  res.send(movie.value);
});

router.get('/watchlist', async (req, res) => {
  const movies = await db.movies
    .find({ watchlist: 'listed' })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  res.send(movies);
});

//HISTORY

router.put('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movieData = req.body;
  delete movieData._id; // Mongo don't let us update this field
  const movie = await db.movies.findOneAndUpdate(
    { movieId },
    { $set: movieData },
    { returnOriginal: false, upsert: true },
  );

  await sleep();
  res.send(movie.value);
});

router.get('/history', async (req, res) => {
  
  const movies = await db.movies
    .find({ history: 'watched' })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  res.send(movies);
});


//PROFILE

router.put('/profile/:slug', async (req, res) => {
  const { slug } = req.params;
  const profileData = req.body;
  delete profileData.slug; // Mongo don't let us update this field
  const profile = await db.profiles.findOneAndUpdate(
    { slug },
    { $set: profileData },
    { returnOriginal: false, upsert: true },
  );

  await sleep();
  res.send(profile.value);
});

router.get('/profile', async (req, res) => {

  const profiles = await db.profiles
  .find({})
  .limit(100)
  .toArray();

res.send(profiles);
  }
);

// router.get('/movies/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   const movie = await db.movies.findOne({ movieId });

//   await sleep(); // force increase latency, simulates real life experience. Delete this on prod
//   if (!movie) {
//     res.sendStatus(404);
//   } else {
//     res.send(movie);
//   }
// });

module.exports = router;
