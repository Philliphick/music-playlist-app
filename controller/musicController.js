const axios = require('axios');
const express = require("express");
const createError = require('http-errors');
const songs = []; 



const youtubeMusicApiKey = '163de1b67fmsh32272f54d1aac12p1cacedjsnd31d2446f36d';
exports.getYouTubeMusicSongInfo = async (artist) => {
  try {
    const response = await axios.get('https://youtube-music-api3.p.rapidapi.com/search', {
      headers: {
        'X-RapidAPI-Key': 'X-RapidAPI-Key',
        'X-RapidAPI-Host': 'X-RapidAPI-Host',
      },
      params: {
        q: artist,
        type: 'song',
      },
    });

    // Assuming the response contains a list of tracks, you can access them like this
    const tracks = response.data;

    // Here, you can process the information about the song as needed
    if (tracks.length === 0) {
      throw createError(404, 'Song not found');
    }

    // Return the tracks (playlist)
    return tracks;
    // Add more properties as needed
  } catch (error) {
    console.error(error);
    throw createError(500, 'Failed to fetch song information from YouTube Music API');
  }
}

exports.getAllSongs = (req, res, next) => { 
  res.send(songs);

};


exports.createSong = async (req, res, next) => {

const isMissingInformation = !req.body.title || !req.body.author
if (isMissingInformation) return next(createError(400, 'Please fill out all fields'))
req.body.id = songs.length + 1 + Date.now()
songs.push(req.body)
res.send(songs)

    // try { 
    //   const songInfo = await getYouTubeMusicSongInfo(req.body);

    //   const newSong = {
    //     id: songs.length + 1 + Date.now(),
    //     title: songInfo.title,
    //     artist: songInfo.artist
        
    // }
    
    // req.body.id = songs.length + 1 + Date.now();
    
// } catch (error) {
//     console.log(error);
//     next(createError(500, 'failed to creat song'))
// }

}


exports.deleteSongs = (req, res, next) => {
    const songId = Number(req.params.id);
    const songIndex = songs.findIndex((song) => song.id === songId)
    if(songIndex === -1) return next(createError(404, "Song not found"));
    songs.splice(songIndex, 1);
    res.send(songs)

}



exports.editSong = (req, res, next) => {
    const titleToEdit = req.params.title;
    
    const indexOfEdit = songs.findIndex((song) => song.title === titleToEdit);
  
    // Check if the song with the given title is found
    if (indexOfEdit !== -1) {
      songs[indexOfEdit].title = req.params.newTitle;
  
      return res.send(songs)
    }
    return next(createError(404, 'Song not found'));
  };




// module.exports = {
//   getYouTubeMusicSongInfo,
//   // Add other functions as needed
// };


