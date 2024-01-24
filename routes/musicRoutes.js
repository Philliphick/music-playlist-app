const express = require("express");
const router = express.Router();
const { getAllSongs, createSong, deleteSongs, editSong, searchById, searchByTitle, searchByAuthor} = require("../controller/musicController")


router.get("/songs", getAllSongs)
router.get("/getSongInfo")
router.get("/songs/:id", searchById)
router.post("/add", createSong)
router.delete("/delete/:id", deleteSongs)
router.put("/edit/:id", editSong)
router.get("/songTitle/:title", searchByTitle)
router.get("/songAuthor/:author", searchByAuthor)

module.exports = router;