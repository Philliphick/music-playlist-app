const express = require('express')
const createError = require('http-errors')
const app = express()
const port = 3001;
const router = require("./routes/musicRoutes")
const axios = require('axios')
const { getYouTubeMusicSongInfo } = require('./controller/musicController');

const songs = [];

app.use(express.json());
app.use(router)

app.get("/getSongInfo", async (req, res) => {
  const author = req.query.author
  const song = req.query.title
  const apiKey = '228d78560bmsh05bd811efe5be6bp130ee7jsn3d6b77092958'

  try {
    const response = await axios.get(`https://youtube-music-api3.p.rapidapi.com/search`, {
      params: {
        q: `${author}`,
        type: 'song',
        },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch song information' });
  
  }

})

app.get('/songs', async (req, res, next) => {
  try {
    // Assuming you want to get YouTube Music song info based on a query parameter
    const artist = req.query.artist; // Assuming the artist is passed as a query parameter

    if (!artist) {
      throw createError(400, 'Artist query parameter is required');
    }

    const response = await getYouTubeMusicSongInfo(artist); 
    console.log(response.data);

    const newSong = {
      id: songs.length + 1 + Date.now(),
      title: req.body.title,
      artist: req.body.author,
      duration: req.body.duration,

    };

    songs.push(newSong);
    res.send(songs);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Failed to create song'));
  }
});


// app.get('/', async (req, res, next) => {
//   // res.send('Hello World from rejgeiopgjgjkpojger ')


//   try {
//      const response = await axios.get(getYouTubeMusicSongInfo(req.body.artist));
//      console.log(response.body)
    
//     const newSong = {
//       id: songs.length + 1 + Date.now(),
//       title: req.body.title,
//       artist: req.body.artist,
//     };
//     songs.push(newSong);
//     res.send(songs);
//   } catch (error) {
//     console.log(error);
//     next(createError(500, 'Failed to create song'));
//   }
// })

// app.post('/add', async (req, res, next) => {
//   // try {
//   //   const songInfo = await getYouTubeMusicSongInfo(req.body.artist);
//   //   console.log("retrieved from youtube in .post")
//   //   const newSong = {
//   //     id: songs.length + 1 + Date.now(),
//   //     title: req.body.title,
//   //     artist: req.body.artist,
//   //   };
//   //   songs.push(newSong);
//   //   res.send(songs);
//   // } catch (error) {
//   //   console.log(error);
//   //   next(createError(500, 'Failed to create song'));
//   // }
// });

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});

app.put('/', (req, res) => {
    res.send('PUT request to homepage')
  })