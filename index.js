require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001;
const router = require("./routes/musicRoutes")
const axios = require('axios')
const mongoose = require('mongoose')
const { getYouTubeMusicSongInfo } = require('./controller/musicController');

const songs = [];

const apiKey = process.env.YoutubeApiKey;
const apiHost = process.env.YoutubeApiHost;

mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log('MongoDB connected'))
app.use(express.json());
app.use(router)

app.get("/getSongInfo", async (req, res) => {
const { author, title } = req.query 


  // const { author } = req.query.author
  // const { song } = req.query.title

  try {
    const response = await axios.get(`https://youtube-music-api3.p.rapidapi.com/search`, {
      params: {
        q: `${author} ${title}`,
        type: 'song',
        },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch song information' });
  
  }

})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
