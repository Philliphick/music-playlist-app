const axios = require('axios');
const express = require("express");
const createError = require('http-errors');
const Song = require("../models/playlist");


const apiKey = process.env.YoutubeApiKey;
const apiHost = process.env.YoutubeApiHost;

const songs = []; 

exports.getAllSongs = async function (req, res, next) { 
  try { 
    const songItem = await Song.find();
    res.send(songItem);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.searchById = async function (req, res, next) {
  try{
    const songItem = await Song.findById(req.params.id)
    if (!songItem) {
      return (next(createError(404, "No song with that ID found")))
    }
    res.send(songItem)
  } catch (err){
    return next(createError(500, err.message));
  }
};

exports.createSong = async function (req, res, next) {  
  try{
    if (!req.body.author || !req.body.title || !req.body.favourite) {
      return (next(createError(400, "author,title and favourite is required")))
    }
    const songItem = new Song({
      author: req.body.author,
      title: req.body.title,
      favourite: req.body.favourite
    })
    await songItem.save()

    res.send(songItem)
  } catch (err) {
    return next(createError(500, err.message))
  }
}


exports.deleteSongs = async function (req, res, next) {

  try {
    const songToDelete = await Song.findByIdAndDelete(req.params.id)
    if(!songToDelete) {
      return next(createError(500, 'no song with that ID'))
    }
    res.send({ result: true})
  } catch (err) {
    return next(createError(500, err.message))
  }
}



exports.editSong = async function (req, res, next) {

  try {
    const songToEdit = await Song.findByIdAndUpdate(req.params.id, {
      author: req.body.author, 
      title: req.body.title,
      favourite: req.body.favourite
    }, { new: true });
    if(!songToEdit) {
      return next(createError(500, "No song with that ID"))
    }
    
    res.send(songToEdit)

  } catch (err) {
    return next(createError(500, "No song with that ID to update"))
  }
  };
  
exports.searchByTitle = async function (req, res, next) {
  try {
    const songItem = await Song.find({ title: req.params.title })
    if(!songItem) {
      return (next(createError(500, "Title not found")))
    }
    res.send(songItem)
  
  } catch (err){
    return next(createError(500, err.message))
  }
}
  


  exports.searchByAuthor = async function (req, res, next) {
    try {
      const songItem = await Song.find({ author: req.params.author })
      if (!songItem) {
        return(next(createError(404, "Author not found")))
      }
      
      res.send(songItem)

    } catch (err){
      return next(createError(500, err.message))
    }
  }

// exports.getSongInfo = async function (res, req, next) {

//   const {author} = req.query.author

// try {
//   const response = await axios.get('https://youtube-music-api3.p.rapidapi.com/search', {
//   params: { author, title}, 
//   headers: {
//     'X-RapidAPI-Host': apiHost, 
//     'X-RapidAPI-Key': apiKey, 
//     'useQueryString': true
//   }
//   }); 
//   return response.data;
// }catch (error) {
//   return next(createError(500, "Data not found"))
// }
// }
// exports.addFavo
