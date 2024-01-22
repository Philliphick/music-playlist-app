const createError = require('http-errors');
const songs = []; 


exports.getAllSongs = (req, res, next) => {
    res.send(songs);
};

exports.createSong = (req, res, next) => {
    songs.push(req.body);
    res.send(songs);
    req.body.id = songs.length + 1 + Date.now();
    
};

exports.deleteSongs = (req, res, next) => {
    const songId = Number(req.params.id);
    const songIndex = songs.findIndex(songs => songs.id === songId)
    if(songIndex === -1) return next(createError(404, "Song not found"));
    songs.splice(songIndex, 1);
    res.send(songs)

}



// exports.editSong = (req, res, next) => {
// //     songs = [{artist: "boy george", 
// // song: "chameleon"}, 
// // {artist: "britney", 
// // song: "toxic"}]



// const indexOfEdit = req.params.title.id


// if(songs[indexOfEdit].title === req.params.title){
//     songs[indexOfEdit].title.splice(indexOfEdit, 1, `${newTitle}`)
//     // songs[indexOfEdit].title = songs[indexOfEdit].newTitle
// }
// return next(createError(404, "Songs Not found"))





// songs[0].title + newTitle
// res.send(songs)
// req.params.title.newTitle

    
    
    // res.send(req.params.title)
    // if(req.body.title) 
    // const newTitle = req.body.title
    // res.body.title

    
//}

// song [ {title , artist } ]

exports.editSong = (req, res, next) => {
    const titleToEdit = req.params.title;
    
    // Find the index of the song with the given title
    const indexOfEdit = songs.findIndex(song => song.title === titleToEdit);
  
    // Check if the song with the given title is found
    if (indexOfEdit !== -1) {
      // Update the title
      songs[indexOfEdit].title = req.params.newTitle; // Assuming the new title is provided in the request body
  
      // Send a success response
      return res.send(songs)
    }
  
    // If the song is not found, send a 404 error
    return next(createError(404, 'Song not found'));
  };