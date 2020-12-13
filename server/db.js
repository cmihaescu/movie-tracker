const MongoClient = require('mongodb').MongoClient;

// Bad practice: don't keep sensitive data in git
const CONFIG = {
  USER: 'Cornel',
  PASS: 'jW0YsJoW3F3cIdk9',
  URL: 'cluster0.fmrrg.mongodb.net/test',
  DB: 'Movie_Tracker',
};

const uri = `mongodb+srv://${encodeURIComponent(CONFIG.USER)}:${encodeURIComponent(CONFIG.PASS)}@${
  CONFIG.URL
}/`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
module.exports = { client };

client
  .connect()
  .then(() => console.log('MongoDB Connected to MongoDB'))
  .catch(error => console.error('Error on connecting to MongoDB server', error))
  .then(() => {
    const movies = client.db(CONFIG.DB).collection('movies');
    const profiles = client.db(CONFIG.DB).collection('profiles');
    module.exports.profiles = profiles;
    module.exports.movies = movies;
  });